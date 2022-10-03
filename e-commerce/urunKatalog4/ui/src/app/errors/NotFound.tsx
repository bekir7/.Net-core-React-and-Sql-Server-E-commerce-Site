import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function NotFound(){
return(
    <Container component={Paper} sx={{height:20}}>
  <Typography gutterBottom variant="h3">oooooops we could not find what u are looking for</Typography>
    <Divider/>
    <Button fullWidth component={Link} to='/category'>Go back to shop</Button>
    
    </Container>
)
}