using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Data;
using urunKatalog4.DTO;
using urunKatalog4.Entity;
using urunKatalog4.Extensions;

namespace urunKatalog4.Controllers
{
    public class SepetController : BaseApiController
    {
        private readonly Context context;

        public SepetController(Context context)
        {
            this.context = context;
        }


       [HttpGet(Name="GetSepet")]

        public async Task <ActionResult<SepetDTO>> GetSepet()
        {
            Sepet sepet=await RetrieveSepet(GetAliciId());

            if (sepet == null) return NotFound();
            return sepet.MapSepetToDto();
         }
         
        
        [HttpPost]

        public async Task <ActionResult<SepetDTO>> AddItemToSepet(int UrunId,int quantity)
        {
            //get sepet //create sepet
            var sepet=await RetrieveSepet(GetAliciId());
            if(sepet==null)sepet=CreateSepet();
             //get urun
            var urun=await context.Uruns.FindAsync(UrunId);
            if(urun==null) return BadRequest(new ProblemDetails{Title="Ürün bulunamadı"}); 
           
            //add item
            sepet.AddItem(urun,quantity);
            var result=await context.SaveChangesAsync()>0;
            if(result)return CreatedAtRoute("GetSepet",sepet.MapSepetToDto());
            return BadRequest(new ProblemDetails{Title="ürün sepete eklenirken hata oluştu"});
            //save changes
           
        }

        [HttpDelete]

        public async Task <ActionResult> RemoveSepetItem(int UrunId,int quantity)
        {
            //get sepet
            var sepet=await RetrieveSepet(GetAliciId());
            if(sepet==null)return NotFound();

            sepet.RemoveItem(UrunId,quantity);

            //save changes
            var result =await context.SaveChangesAsync()>0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails {Title="ürün sepetten silinirken hata oluştu"});
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

        private string GetAliciId()
        {
            return User.Identity?.Name ?? Request.Cookies["aliciId"];
        }



         private Sepet CreateSepet()
        {
            var aliciId=User.Identity?.Name;
            if (string.IsNullOrEmpty(aliciId))
            {
                aliciId=Guid.NewGuid().ToString();
                var cookieOptions=new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
                Response.Cookies.Append("aliciId",aliciId,cookieOptions);
            }
            
            var sepet=new Sepet{aliciId=aliciId};
            context.Sepets.Add(sepet);
            return sepet;
        }
       
       }
    }
