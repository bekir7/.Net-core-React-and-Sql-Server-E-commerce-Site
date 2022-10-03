import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home(){
    const settings={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1
    };
   return(
    <>
    <Slider {...settings}>
        <div>
            <img src="/images/react.jpg" alt="hero" style={{display:'block',width:'100%',maxHeight:500}}/>
        </div>
        <div>
            <img src="/images/sqlserver.jpg" alt="hero" style={{display:'block',width:'100%',maxHeight:500}}/>
        </div>
        <div>
            <img src="/images/netcore.jpg" alt="hero" style={{display:'block',width:'100%',maxHeight:500}}/>
        </div>

    </Slider>
    <Box display='flex' justifyContent='center' sx={{p:4}}>
        <Typography variant="h1">
           Alışverişe Hoş Geldiniz
        </Typography>

    </Box>
    
    </>
   )
}