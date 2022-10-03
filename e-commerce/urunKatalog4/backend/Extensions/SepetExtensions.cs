using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.DTO;
using urunKatalog4.Entity;

namespace urunKatalog4.Extensions
{
    public static class SepetExtensions
    {
        public static SepetDTO MapSepetToDto(this Sepet sepet)
        {
            return new SepetDTO
            {
                Id = sepet.sepetId,
                aliciId = sepet.aliciId,
                Items = sepet.Items.Select(item => new SepetItemDto
                {
                    UrunId = item.urunId,
                    UrunName = item.Urun.UrunName,
                    UrunFiyat = item.Urun.UrunFiyat,
                    UrunImageUrl = item.Urun.UrunImageUrl,
                    Type = item.Urun.Type,
                    UrunMarka = item.Urun.UrunMarka,
                    Quantity = item.Quantity



                }).ToList()



            };
        }
        public static IQueryable<Sepet> RetrieveSepetWithItems(this IQueryable<Sepet> query,string aliciId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Urun).Where(b => b.aliciId == aliciId);
        }
    }
}
