import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props{
    subtotal?:number;
}
export default function SepetSum({subtotal}:Props) {
    const {sepet}=useAppSelector(state=>state.sepet);
     if(subtotal===undefined)
    subtotal = sepet?.items.reduce((sum,item)=>sum+(item.quantity*item.urunFiyat),0) ?? 0;
    const deliveryFee = subtotal>100000 ? 0:500;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Ara Toplam</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Teslimat Ücreti</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Toplam</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*1000 ₺ ve üzerindeki siparişler ücretsiz teslimat için uygundur</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}