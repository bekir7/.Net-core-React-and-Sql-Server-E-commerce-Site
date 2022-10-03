using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Entity;

namespace urunKatalog4.Extensions
{
    public static class UrunExtensions
    {
    public static IQueryable<Urun> Sort(this IQueryable<Urun>query,string orderBy)
        {

            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.UrunName);
            query = orderBy switch
            {
                "fiyat" => query.OrderBy(p => p.UrunFiyat),//swagger ui api/Urun orderby kısmına fiyat yazınca çıkar.
                "fiyatDesc" => query.OrderByDescending(p => p.UrunFiyat),
                _ => query.OrderBy(p => p.UrunName)
            };
            return query;
        }
        public static IQueryable<Urun>Search(this IQueryable<Urun>query,string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.UrunName.ToLower().Contains(lowerCaseSearchTerm));
        }
        public static IQueryable<Urun>Filter(this IQueryable<Urun>query,string marka,string type)
        {
            var markaList = new List<string>();
            var typeList = new List<string>();
            if (!string.IsNullOrEmpty(marka))
                markaList.AddRange(marka.ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(type))
                typeList.AddRange(type.ToLower().Split(",").ToList());

            query = query.Where(p => markaList.Count == 0 || markaList.Contains(p.UrunMarka.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

            return query;
        }
    }
}
