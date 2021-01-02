import React from 'react';
import {
  Router,
  Route,
  Switch,
} from "react-router-dom";

import Callback from './Auth/Callback';
import Auth from './Auth/auth';
import history from './Auth/history';

import Login from './components/Login/index'
import Home from './components/Home/index';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const AuthSwitch = (props) => {
  const { isAuthenticated } = props;
  return isAuthenticated() ? <Home {...props} /> : <Login auth={auth} />
}

const RouteToHome = () => {
  window.location.href="/home"
}

const ApplicationRouter = (props) => {
  const { isAuthenticated } = auth;
  return (
    <Router history={history} component={Login}>
      <Switch>
        <Route exact path="/">
          <RouteToHome />
        </Route>
        <Route path="/home">
          <AuthSwitch {...props} auth={auth} isAuthenticated={() => isAuthenticated()} />
        </Route>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />
        }}/>
      </Switch>
    </Router>
  )
}

export default ApplicationRouter;