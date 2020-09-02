import React from "react";
import Dashboard from "./components/dashboard/dashboard";
import Comments from './components/comments/comments';
import { Route, Switch, Redirect,useHistory} from "react-router-dom";
import { useSelector } from 'react-redux'

let Routers=()=> {
  const loginStatus = useSelector(state => state.userReducer.loginStatus);
  let history = useHistory();

  React.useEffect(() => {
      if (!loginStatus) {
          history.push('/signin')
      }
  }, [loginStatus])
    return (
        <Switch>
          <Route exact path="/Comments" component={Comments} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect  to='/dashboard' from='/' />
        </Switch>
    );
}

export default Routers;
