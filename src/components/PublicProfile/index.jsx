import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import { getPublicPlayerData } from '../../utils/gameApi';

const PublicProfile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [playerData, setPlayerData] = useState({});
  const urlPathName = window.location.pathname;
  const playerUID = urlPathName.split('/u/').pop();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getPublicPlayerData(playerUID, token).then(result => {
        setPlayerData(result.response?.data)
      })
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = useMemo(() => {return !!playerData.message},[playerData])

  const handleAddFriend = () => {
    getAccessTokenSilently().then((token) => {
      // Send friend request
    });
  }

  return (
    <div className='flex flex-col lg:flex-row m-3 md:m-4 justify-evenly'>
      {error && <div>Player not found</div>}
      {playerData && (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {playerData.playerName}
          </Typography>
          <Typography>
            HighScore: {playerData.highScore}
          </Typography>
          <Typography>
            LowScore: {playerData.lowScore}
          </Typography>
          <Typography variant="body2" component="p">
            FriendCount: {playerData.friendCount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAddFriend}>Add Friend</Button>
        </CardActions>
      </Card>
    )}
    </div>
  )
}

export default PublicProfile;