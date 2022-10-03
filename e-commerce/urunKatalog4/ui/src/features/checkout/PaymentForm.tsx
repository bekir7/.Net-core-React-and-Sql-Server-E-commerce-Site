import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function PaymentForm() {
  const {control}=useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <AppTextInput
          control={control} 
          name ='nameOnCard'
          label='Kart üstündeki isim'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
           // required
            id="cardNumber"
            label="Kart Numarası"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
           // required
            id="expDate"
            label="Son Kullanma tarihi"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
           // required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label=""
          />
        </Grid>
      </Grid>
    </>
  );
}