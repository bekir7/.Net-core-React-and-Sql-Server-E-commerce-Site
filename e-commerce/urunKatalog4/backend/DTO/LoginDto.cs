﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace urunKatalog4.DTO
{
    public class LoginDto
    {
       
        public string Email { get; set; }
        public string Username { get; set; }
         public string Password { get; set; }
    
    }
}
