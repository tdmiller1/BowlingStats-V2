import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getPublicPlayerData } from '../../utils/gameApi';
import { Typography } from '@material-ui/core';

const Podium = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getPublicPlayerData(user.sub, user.sub, token).then(result => {
        setPlayerData(result.response?.data)
      })
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!playerData) return null;

  return (
    <div className='flex justify-center pt-4 mt-4'>
      <div className='flex items-end'>
        <div className='Profile-second'>
          <div className="Profile-PodiumResult">
          <Typography variant="subtitle1" color="inherit" className='font-bold'>
            {playerData.average}
          </Typography>
        </div>
        </div>
        <div className='Profile-first'>
          <div className="Profile-PodiumResult">
            <Typography variant="subtitle1" color="inherit" className='font-bold'>
              {playerData.highScore}
            </Typography>
          </div>
        </div>
        <div className='Profile-third'>
          <div className="Profile-PodiumResult">
            <Typography variant="subtitle1" color="inherit" className='font-bold'>
              {playerData.lowScore}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podium;