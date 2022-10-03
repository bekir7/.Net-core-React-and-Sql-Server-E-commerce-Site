import { Typography, Grid, Paper, Box, Button} from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AppDropzone from "../../app/components/AppDropzone";
import AppTextInput from "../../app/components/AppTextInput";
import { Urun } from "../../app/model/urun";
import {yupResolver} from '@hookform/resolvers/yup';
import { validationSchema } from "./UrunValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setUrun } from "../Category/categorySlice";
import { LoadingButton } from "@mui/lab";
import AppSelectList from "../../app/components/AppSelectList";
import 'bootstrap/dist/css/bootstrap.min.css';
interface Props{
    urun?:Urun;
    cancelEdit:()=>void;
}
export default function ProductForm({urun,cancelEdit}:Props) {
    const { control,reset,handleSubmit ,watch,formState:{isDirty,isSubmitting}} = useForm({
        resolver:yupResolver<any>(validationSchema)
    });
   // const {marka,type}=useUrun();
    const watchFile=watch('file',null);
    const dispatch=useAppDispatch();
    useEffect(()=>{
        if(urun && !watchFile && !isDirty) reset(urun);
        return()=>{
            if(watchFile) URL.revokeObjectURL(watchFile.preview);
        }

    },[urun,reset,watchFile,isDirty])
async function handleSubmitData(data:FieldValues){
    try {
      let response:Urun;
      if(urun){
        response=await agent.Admin.updateUrun(data);
      }else{
        response=await agent.Admin.createUrun(data);
      }
      dispatch(setUrun(response));
      cancelEdit();
    } catch (error:any) {
        console.log(error);
    }
}
 return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Ürün Detay
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='urunName' label='Ürün Adı' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control}  name='urunMarka' label='Marka' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control}  name='urunColor' label='Renk' />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <AppSelectList  control={control}  name='urunDurum' label='Durum' />
                    

                </Grid>
               
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='type' label='Kategori' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput  type='number' control={control} name='urunFiyat' label='Fiyat' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='stok' label='Stok Adedi' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='urunDescription' label='Ürün Açıklaması' />
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <AppDropzone control={control} name='file' />
                        {watchFile ? (
                            <img src={watchFile.preview} alt='preview' style={{maxHeight:200}}/>
                         ):(
                            <img src={urun?.urunImageUrl} alt={urun?.urunName} style={{maxHeight:200}}/>

                         )}
                    </Box>
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <LoadingButton 
                loading={isSubmitting}
                type='submit' 
                variant='contained' 
                color='success'>
                    Gönder
                    </LoadingButton>
            </Box>
            </form>
        </Box>
    )
}