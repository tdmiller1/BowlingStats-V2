import React from 'react';

import LandingPage from '../LandingPage'

const Login = ({ auth }) => {
  const { isAuthenticated } = auth;
  return (
    <>
    {isAuthenticated() && <div>Authed</div>}
    {!isAuthenticated() && <div>Not Authed

    <LandingPage callback={auth.login} /></div>}
    </>
  )
}

export default Login;
