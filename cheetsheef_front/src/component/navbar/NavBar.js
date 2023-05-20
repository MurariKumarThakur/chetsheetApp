import React,{useContext,useEffect} from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
 import "./navbar.css"
 import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Avatar } from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import SubjectContext from '../../context/subject/subjectContext';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  useEffect(()=>{
   
      loadUser();
   
    // eslint-disable-next-line
  },[])

  const authContext = useContext(AuthContext)
  const {clearSubjects} = useContext(SubjectContext)
  const {user,loadUser,logout} = authContext;



  function stringToColor(string) {
   
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {

     if(name){

      if(name.split(" ").length===1){

        return {
          sx: {
            bgcolor: stringToColor(name),
          },
           
       
          children:  `${name.split(' ')[0][0]}`,
        };
       }else{
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
        children:  `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
       }   
      }
  }

  const handleLogout=()=>{
    logout();
    clearSubjects();
  }
  return (

  
 

    user !=null ?
     

    <div className='navcontainer' >
        <div className='logo_image'>
        <LibraryBooksIcon/>
        <span>Cheat Sheets | Things to be remember</span>
       </div>
        <div className='profile'>

     

        <Avatar {...stringAvatar(user?.name)} />


           { user?.name ?
            <span style={{margin:"2px"}}>{user.name}  | </span> :<span style={{marginLeft:'3px'}}></span>}

           {user?.name ?

         <span style={{display:"flex",alignItems:"center"}}>
         <LogoutIcon/>
        <span> <NavLink  onClick={handleLogout} style={{color:'inherit',textDecoration:'none'}} to="/signin">Logout</NavLink> </span>
         </span> : <NavLink style={{color:'inherit',textDecoration:'none'}} to="/signin"> Sign In </NavLink> }

        
        </div> 
    </div> :"" 
  )
}

export default NavBar