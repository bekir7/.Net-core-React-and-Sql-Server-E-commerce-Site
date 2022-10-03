using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.DTO
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public SepetDTO Sepet { get; set; }
    }
}
