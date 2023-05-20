
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from "validator";

import AlertContext from "../context/alert/alertContext";
import { validate } from "uuid";
import AuthContext from "../context/auth/authContext";



  
  const SignIn=()=>{
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
            password: "",
           
          });
  
          // home and other route chec
  
          navigate("/home")
       
         
        }

       }
    
    }, [error, isAuthenticated]);
  
    const [user, setUser] = useState({
     
      email: "",
      password: "",
     
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
     if(validator.isEmpty(email) || validator.isEmpty(password)){
        return  setAlert("Please Enter email and password","error")
     }
     if(!validator.isEmail(email)){
       return   setAlert("Please eneter vaid email","error")
     }

     loginUser({
      email,
      password
     })

   
    
    
    
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
              <LockOutlinedIcon />
            </Avatar>
            <p>
               SignIn to Cheat Sheet Website
            </p>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={onChange}
                type="password"
                id="password"
                autoComplete="current-password"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        
        </Container>
      </ThemeProvider>
    )
  }
 
    

export default SignIn