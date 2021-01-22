import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LandingPage from '../LandingPage'

const Login = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
    {isAuthenticated && <div>Authed</div>}
    {!isAuthenticated && <LandingPage />}
    </>
  )
}

export default Login;
