import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validator from "validator";

import AlertContext from "../context/alert/alertContext";
import { validate } from "uuid";
import AuthContext from "../context/auth/authContext";
const SingUp = (props) => {
   const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticated,loadUser } = authContext;

  const [user, setUser] = useState({
    firstName: "",
    email: "",
    password: "",
    confirm: "",
  });
  useEffect(() => {

    if (error) {
      setAlert(error, "error");
      clearError();
    }
    if(isAuthenticated !=null){
      if (isAuthenticated) {
        setAlert("Welcome to the cheetSheet application !", "success");
        setUser({
          firstName: "",
          email: "",
          password: "",
          confirm: "",
        });
       
        navigate("/home")
      }
    }
    
  }, [error, isAuthenticated]);

  const { firstName, email, password, confirm } = user;

  const theme = createTheme();

  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // front end validation

    if (
      validator.isEmpty(firstName) ||
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(confirm)
    ) {
      return setAlert(
        "Name , Email , Password and Confirm password are Required field",
        "error"
      );
    }
    if (password != confirm) {
      return setAlert("Password and confirm password should match", "error");
    }
    if (!validator.isEmail(email)) {
      return setAlert("Enter Valid Email", "error");
    }

    if (password.length < 6 || confirm.length < 6) {
      return setAlert("password should have atleast 6 character", "error");
    }

    //

    register({
      name: firstName,
      email,
      password,
    });


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
         <p>SignUp to Cheat Sheets  website</p>
           
        
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={onChange}
                  value={firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  type="email"
                  fullWidth
                  id="email"
                  onChange={onChange}
                  value={email}
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={onChange}
                  value={password}
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm password"
                  onChange={onChange}
                  value={confirm}
                  id="confirm"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up 
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SingUp;
