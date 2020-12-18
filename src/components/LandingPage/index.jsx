import React from 'react';

const LandingPage = ({callback}) => {
  return (
    <button
      onClick={callback} >
      Log in
  </button>
  )
}

export default LandingPage;