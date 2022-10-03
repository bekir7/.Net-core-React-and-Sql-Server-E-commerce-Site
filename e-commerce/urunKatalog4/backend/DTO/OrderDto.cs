using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Entity.Order;

namespace urunKatalog4.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string aliciId { get; set; }
        public ShippingAdres ShippingAdres { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItemDto> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public string OrderStatus { get; set; } 
        public string PaymentIntentId { get; set; }

        public long Total { get; set; }

    }
}
