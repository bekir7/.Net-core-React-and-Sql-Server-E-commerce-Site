using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using urunKatalog4.Entity;
namespace urunKatalog4.Entity
{
    public class Sepet
    {
        public int sepetId { get; set; }
        public string aliciId { get; set; }
        public List<SepetItem> Items { get; set; }=new();

        public void AddItem(Urun urun,int quantity)
        {
            if(Items.All(item=>item.urunId != urun.UrunId))
            {
                Items.Add(new SepetItem{Urun=urun,Quantity=quantity});
            }
            var existingItem=Items.FirstOrDefault(item=>item.urunId==urun.UrunId);
            if(existingItem!=null) existingItem.Quantity+=quantity;
        }
        public void RemoveItem(int urunId,int quantity)
         {
            var item=Items.FirstOrDefault(item=>item.urunId==urunId);
            if(item==null)return;
            item.Quantity-=quantity;
            if(item.Quantity==0)Items.Remove(item);
         }
    }
}