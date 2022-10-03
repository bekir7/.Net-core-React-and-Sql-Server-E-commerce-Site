using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.DTO;
using urunKatalog4.Entity;
using urunKatalog4.Services;
using urunKatalog4.Data;
using Microsoft.EntityFrameworkCore;
using urunKatalog4.Extensions;
using Newtonsoft.Json;

namespace urunKatalog4.Controllers
{
    
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> userManager;
        private readonly TokenServis tokenServis;
        private readonly Context context;
       

        public AccountController(UserManager<User> userManager,TokenServis tokenServis,Context context)
        {
            
            this.userManager = userManager;
            this.tokenServis = tokenServis;
            this.context = context;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var userSepet = await RetrieveSepet(loginDto.Email);
            var anonSepet = await RetrieveSepet(Request.Cookies["aliciId"]);

            if(anonSepet!=null)
            {
                if (userSepet != null) context.Sepets.Remove(userSepet);
                anonSepet.aliciId = user.Email;  //!!!!!
                Response.Cookies.Delete("aliciId");
                await context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenServis.GenerateToken(user),
                Sepet = anonSepet != null ? anonSepet.MapSepetToDto() : userSepet?.MapSepetToDto()
            };
            
        }


        [HttpPost("register")]

        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
             {  
                UserName = registerDto.Username,
                Email = registerDto.Email 
             };
            var result = await userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
               foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await userManager.AddToRoleAsync(user,"Uye");

            return StatusCode(201);
        }


        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);

            var userSepet=await RetrieveSepet(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenServis.GenerateToken(user),
                Sepet = userSepet?.MapSepetToDto()

            };
        }
        [Authorize]
        [HttpGet("saveAdres")]
        public async Task<ActionResult<UserAdres>> GetSaveAdres()
        {
            return await userManager.Users
                .Where(x => x.UserName == User.Identity.Name)
                .Select(user => user.Adres)
                .FirstOrDefaultAsync();
        }

        private async Task<Sepet> RetrieveSepet(string aliciId)
        {
            if (string.IsNullOrEmpty(aliciId)){

                Response.Cookies.Delete("aliciId");
                return null;
            }


            return await context.Sepets
                .Include(i => i.Items)
                .ThenInclude(p => p.Urun)
                .FirstOrDefaultAsync(x => x.aliciId ==aliciId);
         }
    }
}