import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { currencyFormat } from "../../app/util/util";
import useUrun from "../../app/hooks/useUrun";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeUrun, setPageNumber } from "../Category/categorySlice";
import { useState } from "react";
import UrunForm from "./UrunForm";
import { Urun } from "../../app/model/urun";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inventory() {
    const {uruns,metaData}=useUrun();
    const dispatch=useAppDispatch();
    const [editMode,setEditMode]=useState(false);
    const [selectedUrun,setSelectedUrun]=useState<Urun | undefined>(undefined);
    const [loading,setLoading]=useState(false);
    const [target,setTarget]=useState(0);
     
    function handleSelectUrun(urun:Urun){
         setSelectedUrun(urun);
         setEditMode(true);
     }
    function handleDeleteUrun(id:number){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteUrun(id)
        .then(()=>dispatch(removeUrun(id)))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
    }
     function cancelEdit(){
        if(selectedUrun) setSelectedUrun(undefined);
        setEditMode(false);
     }
    if(editMode) return <UrunForm urun={selectedUrun} cancelEdit={cancelEdit}/>
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Ürün Ekleme</Typography>
                <Button onClick={()=>setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Ürün</TableCell>
                            <TableCell align="right">Fiyat</TableCell>
                            <TableCell align="right">Renk</TableCell>
                            <TableCell align="right">Durumu</TableCell>
                            <TableCell align="center">Kategori</TableCell>
                            <TableCell align="center">Marka</TableCell>
                            <TableCell align="center">Stok Adedi</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uruns.map((urun) => (
                            <TableRow
                                key={urun.urunId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {urun.urunId}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={urun.urunImageUrl} alt={urun.urunName} style={{ height: 50, marginRight: 20 }} />
                                        <span>{urun.urunName}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(urun.urunFiyat)}</TableCell>
                                <TableCell align="center">{urun.urunColor}</TableCell>
                               <TableCell align="center">{urun.urunDurum}</TableCell> 
                                <TableCell align="center">{urun.type}</TableCell>
                                <TableCell align="center">{urun.urunMarka}</TableCell>
                                <TableCell align="center">{urun.stok}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>handleSelectUrun(urun)} startIcon={<Edit />} />
                                    <LoadingButton 
                                    loading={loading && target === urun.urunId} 
                                    startIcon={<Delete />} color='error'
                                    onClick={()=>handleDeleteUrun(urun.urunId)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData && 
            <Box sx={{pt:2}}>
               <AppPagination metaData={metaData} onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}/>
            </Box>
            }
        </>
    )
}