import {  Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAppSelector } from "../../app/store/configureStore";
import SepetSum from "./SepetSum";
import SepetTable from "./SepetTable";

export default function SepetPage(){
const {sepet}=useAppSelector(state=>state.sepet);




if(!sepet) return <Typography variant="h3">Sepetiniz boş</Typography>
return(
   <>
<SepetTable items={sepet.items}  />
 <Grid container>

   <Grid  item xs={6}/>
   <Grid item xs={6}>
      <SepetSum/>
      <Button 
      component={Link}
      to='/checkout'
      variant='contained'
      size='large'
      fullWidth
      >
        Sipariş Özeti
      </Button>
   </Grid>
 </Grid>
   </>
  
)
}