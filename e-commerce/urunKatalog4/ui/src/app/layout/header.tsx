import { ShoppingBag } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
const midLinks=[
    {title:`Ürünler` , path:`/category`},
    {title:'İletişim' , path:`/contact`},


]
const rightLinks=[
    {title:'login' , path:`/login`},
    {title:'register' , path:`/register`},
    


]
const navStyles=[
    {color:'inherit',textDecoration:'none',typography:'h6', '&:hover':{
        color:'grey.500'
    },
     '&.active':{
        color:'secondary'
     }
}
]
export default function Header(){
const{sepet}=useAppSelector(state=>state.sepet);
const {user}=useAppSelector(state=>state.account);
const itemCount=sepet?.items.reduce((sum,item)=>sum+item.quantity,0)
    return(
        <AppBar position='static' >
            <Toolbar sx={{bgcolor:'secondary.main',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Box display='flex' alignItems='center'>
                <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
                    ÜrünlerBurada

                </Typography>
                </Box>
                
           <List sx={{display:'flex'}}>
            {midLinks.map(({title,path})=>(
                <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
                >
                    {title.toUpperCase()}
                </ListItem>
            ))}
            {user&&
             <ListItem
                component={NavLink}
                to={'/inventory'}
                sx={navStyles}
                >
                   Ürün Ekleme
                </ListItem>}
           </List>
          
          <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/sepet' size="large" sx={{color:'inherit'}}>
            <Badge  badgeContent={itemCount} color='secondary'>
             <ShoppingBag/>
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu/>
          ):(
            <List sx={{display:'flex'}}>
            {rightLinks.map(({title,path})=>(
                <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
                >
                    {title.toUpperCase()}
                </ListItem>
            ))}
           </List>
          )}
          
          </Box>
          
            </Toolbar>
        </AppBar>
    )
}