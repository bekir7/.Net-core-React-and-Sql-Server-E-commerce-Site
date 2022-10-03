import { LoadingButton } from "@mui/lab";
import {   Avatar, Button,  CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Urun } from "../../app/model/urun";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addSepetItemAsync } from "../sepet/sepetSlice";


interface Props{
    urun:Urun;
}

export default function Uruncard({urun}:Props){
 const {status}=useAppSelector(state=>state.sepet);
 const dispatch=useAppDispatch();
  

 
    return(
        <Card >
            <CardHeader
            avatar={
                <Avatar sx={{bgcolor:'secondary.main'}}>
                    {urun.urunName.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={urun.urunName}
            titleTypographyProps={{
                sx:{fontWeight:'bold', color:'secondary.main'}
            }}
            />
      <CardMedia
        
        sx={{height:140,backgroundSize:'contain',bgcolor:'secondary.main'}}
        image={urun.urunImageUrl}
        title={urun.urunName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currencyFormat(urun.urunFiyat)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {urun.urunMarka}-{urun.type}
        </Typography>
      </CardContent>
      <CardActions>
      <LoadingButton 
        loading={status.includes('pendingAddItem'+urun.urunId)} 
        onClick={()=>dispatch(addSepetItemAsync({urunId:urun.urunId}))}
         size="small">
          Sepete Ekle
          </LoadingButton>
        <Button component={Link} to={`/category/${urun.urunId}`} size="small">Görüntüle</Button>
      </CardActions>
    </Card>
    )
}