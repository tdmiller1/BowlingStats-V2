import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from "react-router-dom";

import { loginUser } from '../utils/gameApi';

const Callback = () => {
  const { isAuthenticated,  user, getAccessTokenSilently, isLoading } = useAuth0();

  const loginPlayer = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      loginUser(user.sub, user.email, user.name, token)
    });
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      loginPlayer();
    }
  }, [isLoading, isAuthenticated, loginPlayer]);

  if (isLoading) return <div>Loading</div>

  return (
    <Redirect
      to={{
        pathname: "/home",
      }}
    />
  )
}

export default Callback;