using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.Entity.Order
{
    public class Order
    {
        public int Id { get; set; }
        public string aliciId { get; set; }
        public ShippingAdres ShippingAdres { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Hazırlanıyor;
        public string PaymentIntentId { get; set; }

        public long GetTotal()
        {
            return Subtotal + DeliveryFee;
        }
        
    }
}
