import React,{useReducer} from 'react';

import SubjectContext from "./subjectContext";
import SubjectReducer from "./subjectReducer"
import axios from 'axios';
import {
  GET_SUBJECTS,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  SET_CURRENT,
  CLEAR_SUBJECTS,
  CLEAR_CURRENT,
  UPDATE_SUBJECT,
  FILTER_SUBJECT,
  CLEAR_FILTER,
  ADD_SUBJECT_FAIL

} from "../types"

function SubjectState(prop) {
    const initialState = {
        subjects: null,
        loading:true,
        current:null,
        error:null,
    };
    const [state, dispatch] = useReducer(SubjectReducer, initialState);

    // ADD SUBJECT 

  const getSubjects= async ()=>{
  


    try{
      const res= await axios.get("/api/subjects");
      dispatch({type:GET_SUBJECTS,payload:res.data});
     
    }catch(err){
      dispatch({type:ADD_SUBJECT_FAIL,payload:err.response.msg})
      console.log(err)
    }

  }

  const clearSubjects=()=>{
     console.log("clear subjects")
    dispatch({type:CLEAR_SUBJECTS})
  }



   const addSubject= async(subject)=>{
     const config={
        headers:{
            "Content-Type":"application/json"
        }
      }


      try{
        const res= await axios.post("/api/subjects",subject,config);
        dispatch({type:ADD_SUBJECT,payload:res.data})
    
      }catch(err){
        dispatch({type:ADD_SUBJECT_FAIL,payload:err.response.msg})
        console.log(err)
      }

    
   
   }
   const deleteSubject= async(id)=>{
    
    try{
      const res= await axios.delete(`/api/subjects/${id}`);
      dispatch({type:DELETE_SUBJECT,payload:id})
  
    }catch(err){
     
      console.log(err)
    }
   
  
    
   }
   const setCurrent=(subject)=>{
    
    dispatch({type:SET_CURRENT,payload:subject})
  }
  const clearCurrent=()=>{
    
    dispatch({type:CLEAR_CURRENT})
  }
  const updateSubject=async(subject)=>{

    const id=subject._id;

    const config={
      headers:{
          "Content-Type":"application/json"
      }
    }


    try{
      const res= await axios.put(`/api/subjects/${id}`,subject,config);
       dispatch({type:UPDATE_SUBJECT,payload:subject})
  
    }catch(err){
      dispatch({type:ADD_SUBJECT_FAIL,payload:err.response.msg})
      console.log(err)
    }


    
 
  }

    //DELETE SUBJECT 
    //SET SUBJECT
    //CLEAR SUBJECT
    // UPDATE SUBJECT
    // FILTER SUBJECT
    //CLEAR SUBJECT 
    return (
        <SubjectContext.Provider
            value={{
                subjects: state.subjects,
                current:state.current,
                error:state.error,
                loading:state.loading,
                getSubjects,
                addSubject,
                deleteSubject,
                setCurrent,
                clearCurrent,
                updateSubject,
                clearSubjects
                
               
            }}>
            {prop.children}
        </SubjectContext.Provider>


    );






}

export default SubjectState;