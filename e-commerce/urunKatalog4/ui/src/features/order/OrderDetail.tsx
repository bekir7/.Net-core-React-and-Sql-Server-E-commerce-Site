import { Button,  Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SepetItem } from "../../app/model/sepet";
import { Order } from "../../app/model/order";
import SepetSum from "../sepet/SepetSum";
import SepetTable from "../sepet/SepetTable";
import 'bootstrap/dist/css/bootstrap.min.css';
interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetail({ order, setSelectedOrder }: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.urunFiyat), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Sipariş# {order.id} - {order.orderStatus}</Typography>
               
                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Siparişlere geri dön</Button>
            </Box>
            <SepetTable items={order.orderItems as SepetItem[]} isSepet={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                
                    <SepetSum subtotal={subtotal} />
                    
                </Grid>
                
            </Grid>
           
        </>
    )
}