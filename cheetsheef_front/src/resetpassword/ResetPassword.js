
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from "validator";

import AlertContext from "../context/alert/alertContext";
import { validate } from "uuid";
import AuthContext from "../context/auth/authContext";



  
  const ResetPassword=()=>{
     const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { register,loginUser, error, clearError, isAuthenticated,loadUser } = authContext;

   
    useEffect(() => {

      if (error) {
        setAlert(error, "error");
        clearError();
      }
       if(isAuthenticated != null){
        if (isAuthenticated) {
      
          setUser({
        
            email: "",
           
           
          });
  
          // home and other route chec
  
          navigate("/home")
       
         
        }

       }
    
    }, [error, isAuthenticated]);
  
    const [user, setUser] = useState({
     
      email: "",

     
    });
   

  

  
    const { email, password} = user;
  
    const theme = createTheme();

     
  
   

    const onChange=(event)=>{
      setUser({
        ...user,[event.target.name]:event.target.value
      })
    }


   const handleSubmit = (event) => {
    event.preventDefault();
     if(validator.isEmpty(email)){
        return  setAlert("Please Enter email" ,"error")
     }
     if(!validator.isEmail(email)){
       return   setAlert("Please eneter vaid email","error")
     }

    //  loginUser({
    //   email,
    //   password
    //  })

   
    
    
    
  };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockResetIcon />
            </Avatar>
             <p>Reset password for cheat sheet website</p>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                autoComplete="email"
                autoFocus
              />
            
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signin" variant="body2">
                   Login to the cheat sheet website
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        
        </Container>
      </ThemeProvider>
    )
  }
 
    

export default ResetPassword