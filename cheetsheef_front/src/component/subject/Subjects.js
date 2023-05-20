import React, {Fragment,useContext, useState,useEffect } from 'react'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import SubjectContext from '../../context/subject/subjectContext'
import { SpinnerRoundOutlined } from 'spinners-react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';
import SubjectItem from './SubjectItem';
import { Box, Grid, TextField} from "@mui/material";
import Alert from '@mui/material/Alert';
import "./subject.css"
import AuthContext from '../../context/auth/authContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
  var x =[];
const navigate = useNavigate();

 const authContext = useContext(AuthContext)
 const {loadUser,isAuthenticate}=authContext;
  const subjectContext= useContext(SubjectContext)

  const {subjects,getSubjects,loading,user}=subjectContext;
  const [subValue,setSubValue] =useState({
       subject:""
  });
  const [search,setSearched]=useState("");

       useEffect(()=>{
       
         loadUser();
         getSubjects();

        //  if(isAuthenticate){

        //  }else{
        //   navigate('/signin')
        //  }

          
     // eslint-disable-next-line
       },[])




  const [open,setOpen]=useState(false);
    const openpopup=()=>{
      setOpen(true)
    }
    const handleClose=()=>{
      setOpen(false)
    }
    const onChange=(e)=>{
      setSubValue({...subValue,[e.target.name]:e.target.value});
    }

    const onSearchChange=(e)=>{
      setSearched([e.target.name]=e.target.value)
    }
    const onSubmit=(e)=>{
     
      e.preventDefault();
    
      subjectContext.addSubject(subValue);
      setSubValue({
        subject:""
      })
      setOpen(false)
    }

    // if(!isAuthenticate){
    //   return <Navigate to='/signin' />
    // }
    

  return (
    <Fragment>


    

      {loading? <div style={{display:'flex',justifyContent:'center',alignItems:'center' ,height:'80vh'}}> <SpinnerRoundOutlined/></div>:

      <TransitionGroup className="todo-list">


      <div className='buttonPosition'>


      <TextField
      
          id="filled-search"
           fullWidth={true}
          placeholder='Search Subject'
          type="search"
          name='search'
          value={search}
          onChange={onSearchChange}
          variant="outlined"
        />

       {/* <input classname="inputStyle" type='search' /> */}

       <AddIcon  titleAccess='Add New Subject' variant="outlined"  onClick={openpopup} />
 
      </div>

    
     <div className='subContainer'>
    
      <div className='subjectlist'>

       

       {(subjects.length>0)?
       
      //  subjects.map(sub=>(
      //   <SubjectItem sub={sub} />
      //    ))

         subjects.map((sub,index)=>{
       
      
           let subject= sub.subject;
         
           if(!subject.toLowerCase().includes(search.trim().toLowerCase())){
               
                
               if((subjects.length==(index+1))){
                 if(x.length==0){

                 return "No Recrod Found!"
                 }
               }
            }else{
              x.push(subject)
             return(
             
              <SubjectItem key={sub._id} sub={sub} />
             
             )
           }
         
       

        
         
           
              
            
           
           
         })
        :<div>No Subject found !</div>}



     

     
      </div>
      </div>
     
       <Dialog
        open={open}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         
        <DialogTitle id="alert-dialog-title">{"Create Subject"}</DialogTitle>
        <form onSubmit={onSubmit}>
        <DialogContent>
         
        <Box component="form"   >
    
              <TextField
                margin="normal"
               
                name="subject"
                value={subValue.subject}
                onChange={onChange}
                required={true}
               fullWidth
                id="subject"
                label="Enter subject name"
               
              
                autoFocus
              />
              
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
              <Grid container>
              
              
              </Grid>
            </Box>
          
       
        <DialogActions>
          <Button disabled={!subValue.subject} type='submit' variant="contained" color="success">
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
       
        </DialogContent>
        </form >
      </Dialog>

      </TransitionGroup>
}
    
  </Fragment>
  
  )
}

export default Subjects