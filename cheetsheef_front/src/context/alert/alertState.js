import React,{useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer"
import {
    SET_ALERT,
    REMOVE_ALERT

} from "../types"

function AlertState(prop) {
    const initialState = []
   
     
    
    const [state, dispatch] = useReducer(AlertReducer, initialState);

     // set alert


     const setAlert=(msg,type,timeout=5000)=>{
       const id= uuidv4();
       dispatch({
        type:SET_ALERT,
        payload:{msg,type,id}
       })
  // remove alert
       setTimeout(()=>{
        dispatch({
            type:REMOVE_ALERT,
            payload:id
        })
       },timeout)
     }


   
   
    return (
        <AlertContext.Provider
            value={{
                setAlert,
                alerts:state
               
            }}>
            {prop.children}
        </AlertContext.Provider>


    );






}

export default AlertState;