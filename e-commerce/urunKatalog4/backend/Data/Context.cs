using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Entity;
using urunKatalog4.Entity.Order;

namespace urunKatalog4.Data
{
    public class Context : IdentityDbContext<User,Role,int>
    {
       
       public Context(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Urun>Uruns  { get; set; }
        public DbSet<Sepet>Sepets { get; set; }
        public DbSet<Order> Orders { get; set; }
       

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
               .HasOne(a => a.Adres)
               .WithOne()
               .HasForeignKey<UserAdres>(a => a.Id)
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                new Role { Id=1, Name = "Uye", NormalizedName = "UYE" },
                new Role {Id=2, Name = "Admin", NormalizedName = "ADMIN" }

                );
        }
    }
}
