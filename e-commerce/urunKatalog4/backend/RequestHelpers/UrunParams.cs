using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.RequestHelpers
{
    public class UrunParams:PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Type { get; set; }
        public string Marka { get; set; }
    }
}