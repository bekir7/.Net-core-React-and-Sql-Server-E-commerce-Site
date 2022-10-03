using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Data;
using urunKatalog4.Entity;
using Microsoft.EntityFrameworkCore;
using urunKatalog4.Extensions;
using urunKatalog4.RequestHelpers;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using urunKatalog4.DTO;
using AutoMapper;
using urunKatalog4.Servis;

namespace urunKatalog4.Controllers
{
   
    public class UrunController:BaseApiController
    {
        private readonly Context context;
        private readonly IMapper mapper;
        private readonly ImageServis imageServis;

        public UrunController(Context context,IMapper mapper,ImageServis imageServis) 
        {
            this.context = context;
            this.mapper = mapper;
            this.imageServis = imageServis;
        }

        [HttpGet]

        public async Task<ActionResult<PagedList<Urun>>> GetUruns( [FromQuery] UrunParams urunParams)
        {
            var query=  context.Uruns
                .Sort(urunParams.OrderBy)
                .Search(urunParams.SearchTerm)
                .Filter(urunParams.Marka,urunParams.Type)
                .AsQueryable();

            var urun = await PagedList<Urun>.ToPagedList(query, urunParams.PageNumber, urunParams.PageSize);
            Response.AddPageinationHeader(urun.MetaData);
            return urun;
        }

        [HttpGet("{id}",Name ="GetUrun")]

        public async Task <ActionResult<Urun>> GetUrun(int id)
        {
            var urun =  await context.Uruns.FindAsync(id);
            
             if(urun==null) return NotFound();

             return urun;
       
        }

        //kategori marka filtresi
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var marka = await context.Uruns.Select(p => p.UrunMarka).Distinct().ToListAsync();
            var type = await context.Uruns.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { marka, type });
        }


//yeni ürün üretme 
        [Authorize(Roles = "Admin")]
        [HttpPost]
         public async Task<ActionResult<Urun>> CreateUrun([FromForm]CreateUrunDto urunDto)
         {
            var urun = mapper.Map<Urun>(urunDto);
            if (urunDto.File != null)
            {
                var imageResult = await imageServis.AddImageAsync(urunDto.File);
                if(imageResult.Error!=null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                urun.UrunImageUrl = imageResult.SecureUrl.ToString();
                urun.PublicId = imageResult.PublicId;

            }
            context.Uruns.Add(urun);//dto dan database ula�am�yoruz automapper kullan�caz.
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetUrun", new { Id = urun.UrunId }, urun);
            return BadRequest(new ProblemDetails { Title = "Yeni urun olusturulurken hata olustu" });
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateUrun(UpdateUrunDto urunDto)
        {
            var urun = await context.Uruns.FindAsync(urunDto.UrunId);
            if (urun == null) return NotFound();
            mapper.Map(urunDto, urun);
           if (urunDto.File != null) 
            {
                var imageResult = await imageServis.AddImageAsync(urunDto.File);

                if (imageResult.Error != null) 
                    return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                if (!string.IsNullOrEmpty(urun.PublicId)) 
                    await imageServis.DeleteImageAsync(urun.PublicId);

                urun.UrunImageUrl = imageResult.SecureUrl.ToString();
                urun.PublicId = imageResult.PublicId;
            }

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok(urun);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUrun(int id)
        {
            var urun = await context.Uruns.FindAsync(id);
            if (urun == null) return NotFound();
            context.Uruns.Remove(urun);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Urun silinirken hata olustu" });

        }
    }
}