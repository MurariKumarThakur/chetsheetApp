import React,{useEffect,useContext} from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignIn from "./signin/SignIn";
import SingUp from "./SingUp/SingUp";
import NavBar from "./component/navbar/NavBar";                       
import Subjects from "./component/subject/Subjects";
import SubjectState from "./context/subject/SubjectState";
import DetailState from './context/detail/DetailState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import ShowAlert from './component/alert/ShowAlert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './component/routing/PrivateRoute';
import Details from './component/details/Details';
import ResetPassword from './resetpassword/ResetPassword';

if(localStorage.token){
  setAuthToken(localStorage.token)
 }



const App =()=> {




  return (
    <AuthState>
    <SubjectState>
    <DetailState>
    <AlertState>
     <Router>
    <div >



   


    <NavBar/>
   < ShowAlert/>
     <Routes>
      <Route  path="/signin" element={<SignIn/>}     />
      <Route  path="/signup"element={<SingUp/>}  />
      <Route exact path="/forgotpassword" element={<ResetPassword/>} />

    <Route  path="/" element={<PrivateRoute/>}> 
    < Route  path="home"  element= {<Subjects/>} /> 
     <Route  path="subject/:id"  element= {<Details/>}/>

    </Route>



    
  




     </Routes>
    </div>
    </Router>
    </AlertState>
    </DetailState> 
    </SubjectState>
    </AuthState>
  );
}

export default App;
