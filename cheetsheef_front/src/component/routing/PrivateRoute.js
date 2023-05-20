import React, { Component, useContext, useEffect,Fragment } from "react";

import AuthContext from "../../context/auth/authContext";

import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {


const authContext = useContext(AuthContext);
const { isAuthenticated, loadUser,loading } = authContext;




console.log("private route")


   if(isAuthenticated != null){
      if(isAuthenticated  ){
         return <Outlet/>
   
      }else{
          return <Navigate to="/signin" />
       }
   }

   

  

  return(
   <>
   <Outlet/>
   </>
  )

 

    

};

export default PrivateRoute;
