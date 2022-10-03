import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import 'bootstrap/dist/css/bootstrap.min.css';


const theme = createTheme();

export default function Login() {
  const  history=useHistory();
  const location=useLocation<any>();
   const dispatch=useAppDispatch();


  const {register,handleSubmit,formState:{isSubmitting,errors,isValid}}= useForm({
    mode:'all'
  });


   
   async function submitForm(data:FieldValues){
    try {
      await dispatch(signInUser(data));
   history.push(location.state?.from?.pathname ||'/category');
    } catch (error:any) {
      console.log(error);
    }

   
    
    
   }

  




  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <CssBaseline />
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş Yap
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type="email"
              fullWidth
              label="Email"
              autoFocus
              {...register('email',{required:'Email alanı boş bırakılamaz'})}
              error={!!errors.email}
              helperText={errors?.email?.message?.toString()}


            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password',{required:'Şifre alanı boş bırakılamaz'})}
              error={!!errors.password}
              helperText={errors?.password?.message?.toString()}
            />
            
            <LoadingButton
            loading={isSubmitting}
             disabled={!isValid}//Sign In butonunu devre dışı bırakıyor alanlar boş old.için
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link to='/register' >
                  {"Hesabınız yok mu?Kayıt olun"}
                </Link>
              </Grid>
            </Grid>
          </Box>
       
      </Container>
    </ThemeProvider>
  );
}