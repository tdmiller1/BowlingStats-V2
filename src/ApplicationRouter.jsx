import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

import Login from './components/Login/index'
import Home from './components/Home/index';
import Callback from './components/Callback';

const ApplicationRouter = (props) => {
  const { isLoading, isAuthenticated, error } = useAuth0();
  console.log(isLoading)

  if (isLoading) return <div>loading</div>
  if (error) return <div>{error.message}</div>

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect
            to={{
              pathname: "/home",
            }}
          />
        </Route>
        <Route path="/home">
          {isAuthenticated && <Home {...props} />}
          {!isAuthenticated && <Login />}
        </Route>
        <Route path="/callback">
          <Callback />
        </Route>
      </Switch>
    </Router>
  )
}

export default ApplicationRouter;