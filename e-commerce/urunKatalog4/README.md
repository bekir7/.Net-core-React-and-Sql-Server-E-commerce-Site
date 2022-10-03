Ebubekir Yıldırım 
Proje React typescript,Sql server ,.net core kullanılarak geliştirilmiştir.
Geliştirme ortamı VsCode,visual Studio 2019 ve Microsoft SQL server.

Nuget paketleri=
AutoMapper.Extensions.Microsoft.DependencyInjection
CloudinaryDotNet
Microsoft.AspNetCore.Authentication.JwtBearer
Microsoft.AspNetCore.Identity.EntityFrameworkCore
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.Design
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools


Projenin backend kısmını çalıştırmak için cd backend => dotnet watch run
Projenin ui kısmı için cd ui=> npm start .

Code First projedir migration için => dotnet ef migrations add OrderEntityAdded -o Data/Migrations
                                      dotnet ef migrations add PublicIdAdded -o Data/Migrations

appsettings.Development.json içinde Connection string adı altında database mevcut database değişikliği oradan yapılabilir.

Teklif ver apisi yapılamadı.

admin=admin@test.com
user=ebu@test.com
Şu an sadece admin ürün ekleme yapıyor.