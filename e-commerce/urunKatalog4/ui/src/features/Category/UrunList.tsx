import { Grid } from "@mui/material";
import { Urun } from "../../app/model/urun";
import { useAppSelector } from "../../app/store/configureStore";
import Uruncard from "./UrunCard";
import UrunCardSkeleton from "./UrunCardSkeleton";

interface Props {
    uruns:Urun[];
}

export default function UrunList({uruns}:Props){
    const {urunLoaded}=useAppSelector(state=>state.category);
    return(
        <Grid container spacing={4}>
        {uruns.map(urun=>(
        <Grid item xs={4}>
          
          {!urunLoaded ? (
            <UrunCardSkeleton/>
          ):(
            <Uruncard key={urun.urunId} urun={urun}/>

          ) }

        </Grid>

        ))}
       </Grid>
    )
}