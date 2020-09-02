import React from "react";
// import { Link } from "react-router-dom";
import Routes from "./router";
import SignIn from "./components/signin/signin";
import { Route,Switch,Redirect} from "react-router-dom";
import { useSelector } from 'react-redux'
const App =()=> {
  const loginStatus = useSelector(state => state.userReducer.loginStatus);
    return (
      <React.Fragment>
        <Switch>
         <Route path="/signin" render={(props)=>{
           if(loginStatus){
          return  <Redirect  to='/dashboard' from='/signin' />
           }
           return <SignIn {...props} />
         }} />
        <Routes />
        </Switch>
      </React.Fragment>
    );
}

export default App;
