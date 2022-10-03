using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Data;
using urunKatalog4.DTO;
using urunKatalog4.Entity;
using urunKatalog4.Entity.Order;
using urunKatalog4.Extensions;

namespace urunKatalog4.Controllers
{
    [Authorize]
    public class OrderController:BaseApiController
    {
        private readonly Context context;

        public OrderController(Context context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.aliciId == User.Identity.Name)
                .ToListAsync();
        }
        [HttpGet("{id}",Name ="GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.aliciId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }
        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto createorderDto)
        {
            var sepet = await context.Sepets
               .RetrieveSepetWithItems(User.Identity.Name)
               .FirstOrDefaultAsync();

            if (sepet == null) return BadRequest(new ProblemDetails { Title = "Sepet Bulunamadı" });
            var items = new List<OrderItem>();

            foreach(var item in sepet.Items)
            {
                var urunItem = await context.Uruns.FindAsync(item.urunId);
                var itemOrdered = new UrunItemOrdered
                {
                    UrunId = urunItem.UrunId,
                    UrunName = urunItem.UrunName,
                    UrunImageUrl = urunItem.UrunImageUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Fiyat = urunItem.UrunFiyat,
                    Quantity = item.Quantity,
                };
                items.Add(orderItem);
                urunItem.Stok -= item.Quantity;
            }
            var subtotal = items.Sum(item => item.Fiyat * item.Quantity);
            var deliveryFee = subtotal > 100000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                aliciId = User.Identity.Name,
                ShippingAdres = createorderDto.ShippingAdres,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
                //PaymentIntentId = sepet.PaymentIntentId
            };

            context.Orders.Add(order);
            context.Sepets.Remove(sepet);

            if (createorderDto.SaveAdres)
            {
                var user = await context.Users
                    .Include(a => a.Adres)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var adres = new UserAdres
                {
                    AliciName = createorderDto.ShippingAdres.AliciName,
                    Adres1 = createorderDto.ShippingAdres.Adres1,
                    Adres2 = createorderDto.ShippingAdres.Adres2,
                    Il = createorderDto.ShippingAdres.Il,
                    Ilce = createorderDto.ShippingAdres.Ilce,
                    Ulke = createorderDto.ShippingAdres.Ulke
                };
               
                user.Adres = adres;
            }
            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Sipariş oluşturma sorunu" });
        }
    }
}
