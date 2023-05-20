import React,{useReducer} from 'react';

import DetailContext from "./detailContext";
import DetailReducer from "./detailReducer"
import axios from 'axios';
import {
    GET_DETAILS,
    ADD_DETAIL,
    DELETE_DETAIL,
    SET_CURRENT_DETAIL,
    CLEAR_DETAILS,
    CLEAR_CURRENT_DETAIL,
    UPDATE_DETAIL,
    ADD_DETAIL_FAIL


} from "../types"
import detailContext from './detailContext';

function DetailState(prop) {
    const initialState = {

        details: [],
        loading:true,
        current:null,
        error:null,
    };
    const [state, dispatch] = useReducer(DetailReducer, initialState);

    // ADD SUBJECT 

  const getAllDetails= async (id)=>{
  
   console.log("get all details",id)

    try{
      const res= await axios.get(`/api/subdetails/${id}`);
      dispatch({type:GET_DETAILS,payload:res.data});
      
    }catch(err){
      dispatch({type:ADD_DETAIL_FAIL,payload:err.response.msg})
      console.log(err)
    }

  }

//   const clearSubjects=()=>{
//      console.log("clear subjects")
//     dispatch({type:CLEAR_SUBJECTS})
//   }



   const addPoint= async(subvalue,id)=>{

    const {context,code,description}=subvalue;
        console.log(subvalue)


       
    
     const config={
        headers:{
            "Content-Type":"application/json"
        }
      }


      try{
        const res= await axios.post(`/api/subdetails/${id}`,subvalue,config);
        dispatch({type:ADD_DETAIL,payload:subvalue})
    
      }catch(err){
        dispatch({type:ADD_DETAIL_FAIL,payload:err.response.msg})
        console.log(err)
    }

}
   
//    }
//    const deleteSubject= async(id)=>{
    
//     try{
//       const res= await axios.delete(`/api/subjects/${id}`);
//       dispatch({type:DELETE_SUBJECT,payload:id})
  
//     }catch(err){
     
//       console.log(err)
//     }
   
  
    
//    }
   const setCurrent=(detail)=>{
    console.log(detail)
    
    dispatch({type: SET_CURRENT_DETAIL,payload:detail})
  }
  const clearCurrent=()=>{
    
    dispatch({type: CLEAR_CURRENT_DETAIL})
  }
  const updateDetail=async(point)=>{

    const id=point._id;
    const config={
      headers:{
          "Content-Type":"application/json"
      }
    }


    try{
      const res= await axios.put(`/api/subdetails/${id}`,point,config);
      dispatch({type:UPDATE_DETAIL,payload:point})
  
    }catch(err){
      dispatch({type:ADD_DETAIL_FAIL,payload:err.response.msg})
      console.log(err)
    }


    
 
 }

 const  deleteDetail= async(id)=>{

    try{
      const res= await axios.delete(`/api/subdetails/${id}`);
      dispatch({type:DELETE_DETAIL,payload:id})
  
    }catch(err){
     
      console.log(err)
 }
   

 }

 
    return (
        <DetailContext.Provider
            value={{
                details: state.details,
                current:state.current,
                error:state.error,
                loading:state.loading,
                addPoint,
                setCurrent,
                clearCurrent,
                updateDetail,
                deleteDetail,
                getAllDetails
                
               
            }}>
            {prop.children}
        </DetailContext.Provider>


    );






}

export default DetailState;