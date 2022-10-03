using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.Entity
{
    public class User:IdentityUser<int>
    {
        public UserAdres Adres { get; set; }
    }
}
