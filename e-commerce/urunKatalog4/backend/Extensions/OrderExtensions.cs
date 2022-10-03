using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.DTO;
using urunKatalog4.Entity.Order;
using Microsoft.EntityFrameworkCore;
namespace urunKatalog4.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDto
                {
                    Id = order.Id,
                    aliciId = order.aliciId,
                    OrderDate = order.OrderDate,
                    ShippingAdres = order.ShippingAdres,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDto
                    {
                        UrunId = item.ItemOrdered.UrunId,
                        UrunName = item.ItemOrdered.UrunName,
                        UrunImageUrl = item.ItemOrdered.UrunImageUrl,
                        UrunFiyat = item.Fiyat,
                        Quantity = item.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}
