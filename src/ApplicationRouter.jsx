import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LandingPage from "./components/LandingPage";
import Home from "./components/Home/index";
import Callback from "./components/Callback";
import My404Component from "./components/My404Component";
import GameApproval from "./components/GameApproval/index";

import { loginUser } from "./utils/gameApi";

const ApplicationRouter = (props) => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  function loginPlayer() {
    loginUser(user.sub, user.email, user.name);
  }

  if (isLoading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;

  if (user) loginPlayer();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        </Route>
        <Route path="/home">
          <Home {...props} />
        </Route>
        <Route path="/callback">
          <Callback />
        </Route>
        <Route path="/login">
          {!isAuthenticated && <LandingPage />}
          {isAuthenticated && (
            <Redirect
              to={{
                pathname: "/home",
              }}
            />
          )}
        </Route>
        <Route path={process.env.REACT_APP_APPROVAL_ROUTE}>
          <GameApproval {...props} />
        </Route>
        <Route path="*" exact={true} component={My404Component} />
      </Switch>
    </Router>
  );
};

export default ApplicationRouter;
