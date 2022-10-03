using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.Entity
{
    [Table("SepetItem")]
    public class SepetItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        public int urunId { get; set; } 
        public Urun Urun { get; set; }
        
        public int SepetId { get; set; }
        public Sepet Sepet { get; set; }
    }

}