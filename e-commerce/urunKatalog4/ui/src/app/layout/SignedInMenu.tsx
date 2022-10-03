import {  Menu, Fade, MenuItem } from "@mui/material";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../features/account/accountSlice";
import { clearSepet } from "../../features/sepet/sepetSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignedInMenu(){
  const {user}=useAppSelector(state=>state.account);
  const dispatch=useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
      variant="secondary"
      onClick={handleClick}
      //sx={{typography:'h6'}}
      
      >
        {user?.email}

      </Button>
      <Menu
       
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        
        <MenuItem component={Link} to='/order'>Siparişlerim</MenuItem>
        <MenuItem onClick={()=>{
            dispatch(signOut());
            dispatch(clearSepet());
        }}>Çıkış Yap</MenuItem>
      </Menu>
    </>
  );
}
