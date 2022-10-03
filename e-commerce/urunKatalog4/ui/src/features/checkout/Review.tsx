import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';
import SepetSum from '../sepet/SepetSum';
import SepetTable from '../sepet/SepetTable';


export default function Review() {
  const {sepet}=useAppSelector(state=>state.sepet);

  return (
    <>
      <Typography variant="h6" gutterBottom>
      Sipariş özeti
      </Typography>
      {sepet &&
      <SepetTable items={sepet.items} isSepet={false} />}
 <Grid container>

   <Grid  item xs={6}/>
   <Grid item xs={6}>
      <SepetSum/>
    
   </Grid>
 </Grid>
    </>
  );
}
