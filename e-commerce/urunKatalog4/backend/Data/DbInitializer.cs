using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Entity;
namespace urunKatalog4.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(Context context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                   UserName = "ebu",
                    Email = "ebu@test.com"
                };
                await userManager.CreateAsync(user,"Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Uye");


                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin,new [] { "Uye", "Admin" });
            }

             if(context.Uruns.Any()) return ;
           
             context.SaveChanges(); 
        }
    }
}