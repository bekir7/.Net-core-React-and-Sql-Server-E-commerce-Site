using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.Entity.Order
{
    public class OrderItem
    {
        public int Id { get; set; }
        public UrunItemOrdered ItemOrdered { get; set; }
        public long Fiyat { get; set; }
        public int Quantity { get; set; }
    }
}
