using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.DTO
{
    public class CreateUrunDto
    {
        [Required]
        public string UrunName { get; set; }
        [Required]
        public string UrunDescription { get; set; }
       // [Required]
        public string UrunColor { get; set; }
       // [Required]
        public string UrunMarka { get; set; }
       [Required]
        public string UrunDurum { get; set; }
        [Required]
        public IFormFile File { get; set; }
        [Required]
        [Range(0,Double.PositiveInfinity)]//girilen fiyat 0 ile pozitif sonsuz arası olacak
        public int UrunFiyat { get; set; }
        // public bool isOfferable { get; set; }
        // public bool isApproved { get; set; }
        [Required]
        [Range(0, 200)]//girilen stok 200 ile sınırlı
        public int Stok { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
