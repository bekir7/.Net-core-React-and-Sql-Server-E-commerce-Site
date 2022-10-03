using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.DTO;
using urunKatalog4.Entity;

namespace urunKatalog4.RequestHelpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateUrunDto, Urun>();
            CreateMap<UpdateUrunDto, Urun>();

        }
    }
}
