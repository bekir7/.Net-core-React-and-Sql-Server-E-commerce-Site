import { useEffect } from "react";
import { urunSelectors, fetchUrunlerAsync, fetchFilters } from "../../features/Category/categorySlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useUrun(){
    const uruns=useAppSelector(urunSelectors.selectAll);
    const dispatch=useAppDispatch();
    const {urunLoaded,filtersLoaded,marka,type,metaData}=useAppSelector(state=>state.category);
  useEffect(()=>{
    if(!urunLoaded) dispatch(fetchUrunlerAsync());
  
      }, [urunLoaded,dispatch])
  
      useEffect(()=>{
        if(!filtersLoaded) dispatch(fetchFilters());
  
      },[dispatch,filtersLoaded])

      return {
        uruns,
        urunLoaded,
        filtersLoaded,
        marka,
        type,
        metaData
    
      }
}