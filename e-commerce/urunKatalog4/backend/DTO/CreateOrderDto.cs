using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Entity.Order;

namespace urunKatalog4.DTO
{
    public class CreateOrderDto
    {
        public bool SaveAdres { get; set; }
        public ShippingAdres ShippingAdres { get; set; }
    }
}
