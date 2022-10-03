import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {  useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import AppCheckbox from '../../app/components/AppCheckbox';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function AdresForm() {
  const{control,formState}=useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
       Sipariş Adresi
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput
          control={control} 
          name ='aliciname'
          label='Full name'
          />
        </Grid>
       
        <Grid item xs={12}>
        <AppTextInput
          control={control} 
          name ='adres1'
          label='1.Adres'
          />
        </Grid>
        <Grid item xs={12}>
        <AppTextInput
          control={control} 
          name ='adres2'
          label='2.Adres'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput
          control={control} 
          name ='il'
          label='Şehir'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput
          control={control} 
          name ='ilce'
          label='Ilçe'
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <AppTextInput
          control={control} 
          name ='ulke'
          label='Ülke'
          />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
          disabled={!formState.isDirty}
          name='saveAdres'
          label='Adresi kaydet'//default olarak kayıt ediliyor
          control={control}
          />
        </Grid>
      </Grid>
      
    </>
  );
}