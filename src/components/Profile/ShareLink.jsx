import React from 'react';
import { Button } from '@material-ui/core';

const ShareLink = ({ authId }) => {
  const friendReferrelLink = window.location.host + `/home/u/${authId}`
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => navigator.clipboard.writeText(friendReferrelLink.toString())}
    >
      Copy Friend Referrel Link
    </Button>
  );
}

export default ShareLink;