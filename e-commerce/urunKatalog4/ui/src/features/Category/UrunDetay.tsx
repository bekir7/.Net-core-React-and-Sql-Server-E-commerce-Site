import { LoadingButton } from "@mui/lab";
import { Button, Divider,  Grid,Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponents from "../../app/layout/LoadingComponents";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import {  addSepetItemAsync, removeSepetItemAsync } from "../sepet/sepetSlice";
import {  fetchUrunAsync, urunSelectors } from "./categorySlice";



export default function UrunDetay(){
   const{sepet,status}=useAppSelector(state=>state.sepet);
   const dispatch=useAppDispatch();
   const {urunId}=useParams<{urunId:string}>();
   const urun=useAppSelector(state=>urunSelectors.selectById(state,urunId));
   const [quantity,setQuantity]=useState(0);
   const item= sepet?.items.find( i =>i.urunId===urun?.urunId);
   const {status:urunStatus}=useAppSelector(state=>state.category);
  
  
   useEffect(()=>{
      if(item) setQuantity(item.quantity);
      if(!urun) dispatch(fetchUrunAsync(parseInt(urunId)));
   },[urunId,item,dispatch,urun]);
// ürünü inceleme kısmında adet arttırıp azaltıyoruz negatif sayılar olmayacak.
   

function handleInputChange(event:any){
      if(event.target.value >= 0){
         setQuantity(parseInt(event.target.value))

      }
   }
   
   function handleUpdateSepet(){
     
      if(!item || quantity>item.quantity){
         const updateQuantity=item ? quantity - item.quantity:quantity;
         dispatch(addSepetItemAsync({urunId:urun?.urunId!,quantity:updateQuantity}));
      }else{
         const updateQuantity=item.quantity-quantity;
         dispatch(removeSepetItemAsync({urunId:urun?.urunId!,quantity:updateQuantity}))
      }
   }
   
  if(urunStatus.includes('pending')) return<LoadingComponents/>

  if (!urun) return <NotFound />
   return(
  <Grid container spacing={6}>
     <Grid item xs={6}>
        <img src={urun.urunImageUrl} alt={urun.urunName} style={{width:'100%'}}/>
     
     </Grid>
     <Grid item xs={6}>
      <Typography  variant="h3"> 
{urun.urunName}
      </Typography>
<Divider sx={{mb:2}}/>
<Typography variant="h4" color='secondary'>
{currencyFormat(urun.urunFiyat)}
</Typography>
<TableContainer>
   <Table>
      <TableBody>
         <TableRow>
            <TableCell>Adı</TableCell>
            <TableCell>{urun.urunName}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Açıklama</TableCell>
            <TableCell>{urun.urunDescription}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Rengi</TableCell>
            <TableCell>{urun.urunColor}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Ürünün Durumu</TableCell>
           
            <TableCell>{urun.urunDurum}</TableCell>
            
         </TableRow>
         <TableRow>
            <TableCell>Kategori</TableCell>
            <TableCell>{urun.type}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Marka</TableCell>
            <TableCell>{urun.urunMarka}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell>Stok adedi</TableCell>
            <TableCell>{urun.stok}</TableCell>
         </TableRow>
      </TableBody>
   </Table>
</TableContainer>
   <Grid container spacing={2}>
      <Grid>
         <TextField
         onChange={handleInputChange}
         variant="outlined"
         type='number'
         label=' Adet'
         fullWidth
         value={quantity}
         />
      </Grid>
      <Grid item xs={6}>
         <LoadingButton
         disabled={item?.quantity === quantity }
         loading={status.includes('pending')}
         onClick={handleUpdateSepet}
         sx={{height:'55px'}}
         color='primary'
         size='large'
         variant="contained"
         fullWidth
         >
            {item ? 'Güncelle':'Sepete Ekle'}
         </LoadingButton>
         <Grid >
       <form  style={{margin: 20 }}>
      <h4> Teklif ver </h4>
      <label>
      <TextField
         variant="outlined"
         type='number'
         label=' Teklif ver'
         fullWidth
         />
      </label>
      <Button className="btn btn-info btn-lg" type="submit" value="Submit" style={{marginLeft: 10 + 'px'}}>Teklif gönder</Button>
  </form>
  </Grid>
      </Grid>
   </Grid>
     </Grid>
  </Grid>
   )
}