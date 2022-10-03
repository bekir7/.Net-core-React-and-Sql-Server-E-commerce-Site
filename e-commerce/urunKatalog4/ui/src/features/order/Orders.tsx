import { TableContainer, Paper,Button } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Order } from "../../app/model/order";
import { currencyFormat } from "../../app/util/util";
import OrderDetail from "./OrderDetail";

export default function Orders(){
   const [orders,setOrders]=useState < Order[] | null > (null);
   const [loading,setLoading]=useState(true);
   const [selectedOrderNumber,setSelectedOrderNumber]=useState(0);
 useEffect(()=>{
    setLoading(true);
    agent.Order.list()
    .then(orders=>setOrders(orders))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
 },[])
if(loading)return <LoadingComponents />

if(selectedOrderNumber>0)return(
  <OrderDetail
  order={orders?.find(o=>o.id===selectedOrderNumber)!}
  setSelectedOrder={setSelectedOrderNumber}
  />
)
    return (
        <TableContainer component={Paper}>
      <Table /*sx={{ minWidthead: 650 }}*/striped="columns" aria-label="simple table">
        <thead>
          <tr>
            <th colSpan={2}>Sipariş Numarası</th>
            <th align="right" colSpan={2}>Toplam</th>
            <th align="right" colSpan={2}>Sipariş Tarihi</th>
            <th align="right" colSpan={2}>Sipariş Durumu</th>
            <th align="right" colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr
              key={order.id}
              /*sx={{ '&:last-child td, &:last-child thead': { border: 0 } }}*/
            >
              <td >
              {order.id}
              </td>
              <td  align="right" colSpan={2}>{currencyFormat( order.total)}</td>
              <td align="right" colSpan={2}>{order.orderDate.split('T')[0]}</td>
              <td align="right" colSpan={2}>{order.orderStatus}</td>
              <td align="right" colSpan={2}>

                <Button onClick={()=>setSelectedOrderNumber(order.id)}>
                  
                  Görüntüle
                  
                  </Button>
                  
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
    )
}