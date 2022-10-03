using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using urunKatalog4.RequestHelpers;

namespace urunKatalog4.Extensions
{
    public static class HttpExtension
    {
        public static void AddPageinationHeader(this HttpResponse response,MetaData metaData)
        {
            var opt = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData,opt));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
