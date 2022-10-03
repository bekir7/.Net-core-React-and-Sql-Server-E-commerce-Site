import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setUrunParams } from "./categorySlice";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function UrunSearch(){
    const {urunParams}=useAppSelector(state=>state.category);
    const dispatch=useAppDispatch();
    const [searchTerm,setSearchTerm]=useState(urunParams.searchTerm);
    
    const debouncedSearch =debounce((event:any)=>{
        dispatch(setUrunParams({searchTerm:event.target.value}))
    },2000)
    return(
        <TextField
          label='Ürün Ara'
          variant='outlined'
          fullWidth
          value={searchTerm ||''}
          onChange={(event:any)=>{
            setSearchTerm(event.target.value);
            debouncedSearch(event);
          }}
          />
    )
}