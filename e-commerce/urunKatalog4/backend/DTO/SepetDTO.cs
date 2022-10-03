using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.DTO
{
    public class SepetDTO
    {
        public int Id { get; set; }
        public string aliciId { get; set; }
        public List <SepetItemDto> Items{get;set;}
    }
}