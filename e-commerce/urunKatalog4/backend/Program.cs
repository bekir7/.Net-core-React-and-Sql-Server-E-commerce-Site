using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using urunKatalog4.Entity;
namespace urunKatalog4
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
          var host = CreateHostBuilder(args).Build();
         using var scope = host.Services.CreateScope();
          var context= scope.ServiceProvider.GetRequiredService<Context>();
          var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
          var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        try
        {
          await context.Database.MigrateAsync();
          await DbInitializer.Initialize(context,userManager); 
        }
        catch (Exception ex)
        {
            
            logger.LogError(ex,"problem migrating data");
        }
       await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
