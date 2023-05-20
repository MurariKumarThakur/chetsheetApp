import React,{useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from "./authContext";
import AuthReducer from "./authReducer"
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
     AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR

} from "../types"

import axios from 'axios';

const AuthState= (prop)=> {

    const initialState = {
     token:localStorage.getItem('token'),
     isAuthenticated:null,
     loading:true,
     user:null,
     error:null
     
    };

  
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // load user 

    const loadUser= async()=>{
       if(localStorage.token){
        setAuthToken(localStorage.token)
       }
        try{
          const res= await axios.get("/api/auth");
           dispatch({
             type:USER_LOADED,
             payload:res.data
           })
           }catch(err){
            dispatch({
             type:AUTH_ERROR,
             
            })
           }
       
    
         
    }



    // register user 

    const register= async(formData)=>{
      const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
        try{
    const res = await axios.post("/api/users",formData,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
   
       
        }catch(err){
      dispatch({
        type:REGISTER_FAIL,
        payload:err.response.data.msg
      })

        }
    }

    // login user 

    const loginUser= async(formData)=>{
      const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
        try{
    const res = await axios.post("/api/auth",formData,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
      
       
        }catch(err){
      dispatch({
        type:LOGIN_FAIL,
        payload:err.response.data.msg
      })

        }
    }

    // logout

    const logout=()=>{
      dispatch({
        type:LOGOUT
      })
    }
    // clear errors
     
      const clearError=()=>{
        console.log("clear Error calls")
        dispatch({
            type:CLEAR_ERROR,
         
        })
      }
    
    return (
        <AuthContext.Provider
            value={{
              token: state.token,
              isAuthenticated:state.isAuthenticated,
              loading:state.loading,
              user:state.user,
              error:state.error,
              register,
              loginUser,
              clearError,
              loadUser,
              logout
               
            }}>
            {prop.children}
        </AuthContext.Provider>


    );


          



}

export default AuthState;