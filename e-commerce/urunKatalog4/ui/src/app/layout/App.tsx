import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import {useState,useEffect, useCallback} from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import About from "../../features/about/About";
import Category from "../../features/Category/Category";
import UrunDetay from "../../features/Category/UrunDetay";
import Contact from "../../features/contact/Contact";
import Home from "../../features/home/Home";
import Header from "./header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import SepetPage from "../../features/sepet/SepetPage";
import LoadingComponents from "./LoadingComponents";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { fetchSepetAsync } from "../../features/sepet/sepetSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/order/Orders";
import Inventory from "../../features/admin/Inventory";

function App(){
  const dispatch=useAppDispatch();
 const [loading,setLoading]=useState(true);



 const initApp=useCallback(async ()=>{
  try {
    await dispatch(fetchCurrentUser());
    await dispatch(fetchSepetAsync());
  } catch (error:any) {
    console.log(error);
  }
},[dispatch])


 useEffect(()=>{
 initApp().then(()=>setLoading(false));
 }, [initApp])
 if(loading)return <LoadingComponents message='Initialising app..'/>
return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme='colored'/>
    <CssBaseline />
     <Header />
     <Route exact path='/' component={Home} />
     <Route path={'/(.+)'} render={()=>(
      <Container sx={{mt:4}}>
      <Switch>
        <Route exact path='/category'component={Category} />
        <Route path="/category/:urunId" component={UrunDetay} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/server-error" component={ServerError} />
        <Route path="/sepet" component={SepetPage} />
        <PrivateRoute path="/checkout" component={CheckoutPage} />
        <PrivateRoute path="/order" component={Orders} />
        <PrivateRoute roles={['Admin']} path="/inventory" component={Inventory} />
    
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route  component={NotFound} />
    </Switch>
    

    </Container>
     )}/>
    
    </>
  );

  }
export default App;
