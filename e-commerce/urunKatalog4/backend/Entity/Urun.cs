using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.Entity
{
    public class Urun
    {
        [Key]
        public int UrunId { get; set; }
        [MaxLength(100)]//ürün adı max 100 karakter olacak.
        public string UrunName { get; set; }
        [MaxLength(500)]//ürün açıklaması max 500 karakter olacak.
        public string UrunDescription { get; set; }
        public string UrunColor { get; set; }
        public string UrunMarka { get; set; }
        public string UrunDurum { get; set; }
        public string UrunImageUrl { get; set; }
        public int UrunFiyat { get; set; }
        public bool isOfferable { get; set; }
        public int Stok { get; set; }
        public string Type { get; set; }
        public string PublicId { get; set; }
    }
}
