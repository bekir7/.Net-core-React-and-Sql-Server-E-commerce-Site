using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.Entity.Order
{
    [Owned]
    public class UrunItemOrdered
    {
        public int UrunId { get; set; }
        public string UrunName { get; set; }
        public string UrunImageUrl { get; set; }
    }
}
