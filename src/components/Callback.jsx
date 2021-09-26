import React, { useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

import { loginUser } from "../utils/gameApi";

const Callback = () => {
  const { isAuthenticated, user, getAccessTokenSilently, isLoading } =
    useAuth0();

  const loginPlayer = useCallback(async () => {
    loginUser(user.sub, user.email, user.name);
    try {
      await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: "read:global-highscores",
      });
    } catch (e) {
      console.error(e);
    }
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      loginPlayer();
    }
  }, [isLoading, isAuthenticated, loginPlayer]);

  if (isLoading) return <div>Loading</div>;

  return (
    <Redirect
      to={{
        pathname: "/home",
      }}
    />
  );
};

export default Callback;
