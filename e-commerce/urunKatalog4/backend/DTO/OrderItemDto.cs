using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.DTO
{
    public class OrderItemDto
    {
        public int UrunId { get; set; }
        public string UrunName { get; set; }
        public string UrunImageUrl { get; set; }
        public long UrunFiyat { get; set; }
        public int Quantity { get; set; }
    }
}
