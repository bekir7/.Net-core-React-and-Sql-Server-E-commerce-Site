import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper,  TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { SepetItem } from "../../app/model/sepet";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { removeSepetItemAsync, addSepetItemAsync } from "./sepetSlice";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props{
    items:SepetItem[];
    isSepet?:boolean;//sepette ürün ekle çıkarma (+-)
}



export default function SepetTable({items,isSepet=true}:Props){
const {status}=useAppSelector(state=>state.sepet);
const dispatch=useAppDispatch();
    return (
        <TableContainer component={Paper}>
        <Table /*sx={{ minWidth: 650 }}*/ >
          <TableHead>
            <TableRow>
              <TableCell>Ürün</TableCell>
              <TableCell align="right">Fiyat</TableCell>
              <TableCell align="center">Stok Adedi</TableCell>
              <TableCell align="right">Toplam</TableCell>
              {isSepet && 
              <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow
                key={item.urunId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                      <img src={item.urunImageUrl} alt={item.urunName} style={{height:50,marginRight:20}}/>
                      <span>{item.urunName}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">₺{(item.urunFiyat / 100).toFixed(2)}</TableCell>
                <TableCell align="right">
                 {isSepet &&

                 <LoadingButton loading={status==='pendingRemoveItem'+item?.urunId+'rem'} onClick={()=>dispatch(removeSepetItemAsync({urunId:item.urunId,quantity:1,name:'rem'}))} color="error">
                    <Remove />
                 </LoadingButton>}
                 {item.quantity}
                 {isSepet &&
                 <LoadingButton loading={status==='pendingAddItem'+item.urunId} onClick={()=>dispatch(addSepetItemAsync({urunId:item.urunId}))}  color="secondary">
                    <Add />
                 </LoadingButton>}
                 
                 
                 </TableCell>
                <TableCell align="right">₺{((item.urunFiyat / 100) * item.quantity).toFixed(2)}</TableCell>
               {isSepet &&
                <TableCell align="right">
                    <LoadingButton loading={status==='pendingRemoveItem'+item.urunId+'del'} onClick={()=>dispatch(removeSepetItemAsync({urunId:item.urunId,quantity:item.quantity,name:'del'}))} color="error">
                       <Delete />
                    </LoadingButton>
     
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}