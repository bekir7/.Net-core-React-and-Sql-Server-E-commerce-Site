import {   Grid, Paper,  Typography } from "@mui/material";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButton from "../../app/components/CheckboxButton";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import useUrun from "../../app/hooks/useUrun";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageNumber, setUrunParams } from "./categorySlice";
import UrunList from "./UrunList";
import UrunSearch from "./UrunSearch";
import 'bootstrap/dist/css/bootstrap.min.css';

const sortOptions=[
  {value:'name', label:'Alfabetik'},
  {value:'fiyatDesc', label:'Fiyat Çoktan-Aza'},
  {value:'fiyat', label:'Fiyat Azdan-Çoğa'},
]

export default function Category(){
  const{uruns,marka,type,filtersLoaded,metaData}=useUrun();
  const dispatch=useAppDispatch();
  const {urunParams}=useAppSelector(state=>state.category);



if(!filtersLoaded ) return <LoadingComponents/>

 
  return(
    <Grid container columnSpacing={4}>
       <Grid item xs={3}>
        <Paper sx={{mb:2}}>
          <UrunSearch/>
        </Paper>
        <Paper sx={{mb:2,p:2}}>
      
       <RadioButtonGroup 
       selectedValue={urunParams.orderBy}//alfabetik çoktan aza azdan çoğa 
       options={sortOptions}
       onChange={(e)=>dispatch(setUrunParams({orderBy:e.target.value}))}
       />
        </Paper>

        <Paper sx={{mb:2,p:2}}>
       <Typography>Marka</Typography>
        <CheckboxButton
                items={marka}
                checked={urunParams.marka}
                onChange={(items: string[]) => dispatch(setUrunParams({ marka: items }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                <Typography>Kategori</Typography>
                    <CheckboxButton
                        items={type}
                        checked={urunParams.type}
                       onChange={(items: string[]) => dispatch(setUrunParams({ type: items }))}
                    />
        </Paper>
       </Grid>
       <Grid item xs={9}>
       <UrunList  uruns={uruns} />
       </Grid>
       <Grid item xs={3}/>
       <Grid item xs={9} sx={{mb:2}}>
        {metaData &&
       <AppPagination 
       metaData={metaData}
       onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
       />}
        </Grid>   
   </Grid>
   
  )  
}