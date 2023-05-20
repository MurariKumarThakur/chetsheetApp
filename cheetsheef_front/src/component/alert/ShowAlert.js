import React,{useContext} from 'react'
import AlertContext from '../../context/alert/alertContext'
import { Alert } from '@mui/material'

const ShowAlert = () => {
  const alertContext = useContext(AlertContext)
  const {alerts}=alertContext;
  return(
  alerts.length>0 && alerts.map(alert=>(
   <Alert key={alert.id} severity={alert.type}>{alert.msg}</Alert>
   ))

   
  )
   
}

export default ShowAlert