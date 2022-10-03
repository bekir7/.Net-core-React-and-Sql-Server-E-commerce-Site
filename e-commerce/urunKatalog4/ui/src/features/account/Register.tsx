import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  Paper } from '@mui/material';
import { Link, useHistory} from 'react-router-dom';
import agent from '../../app/api/agent';
import {  useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Register() {
  const  history=useHistory();
  
  const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}}= useForm({
    mode:'all'
  });
  
  
   function handleApiErrors(errors: any) {
    if (errors) {
        errors.forEach((error: string) => {
            if (error.includes('Password')) {
                setError('password', { message: error })
            } else if (error.includes('Email')) {
                setError('email', { message: error })
            } else if (error.includes('Username')) {
              setError('username', { message: error })
          }
        });
    }
}

  return (
   
      <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <CssBaseline />
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>
          <Box component="form" 
          onSubmit={handleSubmit((data)=>
          agent.Account.register(data)

          .then(()=>{
            toast.success('Kayıt olma başarılı---Giriş yap');
            history.push('/login')
          })
          .catch(error=>handleApiErrors(error))
          )} 
          noValidate sx={{ mt: 1 }}
          >
             <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors?.username?.message?.toString()}
                />
            <TextField
              margin="normal"
              fullWidth
              type="email"
              label="Email"
              {...register('email',{
                required:'Email alanı boş bırakılamaz',
                pattern:{
                    value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                    message:'Geçerli bir e-posta adresi değil'
                }
            })}
              error={!!errors.email}
              helperText={errors?.email?.message?.toString()}


            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password',{
                required:'Şifre alanı boş bırakılamaz',
                pattern:{
                    value:/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message:'Parola karmaşıklık gereksinimini karşılamıyor'
                }
            
            })}
              error={!!errors.password}
              helperText={errors?.password?.message?.toString()}
            />
            
            <LoadingButton
            disabled={!isValid}//Sign In butonunu devre dışı bırakıyor alanlar boş old.için
            loading={isSubmitting}
             
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kayıt Ol
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link to='/login' >
                  {"Zaten hesabınız var mı?Giriş yap"}
                </Link>
              </Grid>
            </Grid>
          </Box>
       
      </Container>
   
  );
}