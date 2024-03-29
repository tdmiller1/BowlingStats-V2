import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import ShareLink from './ShareLink';
import PersonalInfo from './PersonalInfo';
import Podium from './Podium';
import UploadHistory from './UploadHistory';
import Leaderboard from './Leaderboard';
import "./Profile.scss";

const Profile = ({ profile, refreshCallback }) => {
  const { user } = useAuth0();

  if (!profile) return null;

  return (
    <div className='flex flex-col lg:flex-row m-3 md:m-4 justify-evenly'>
      <div className="Profile-Section text-center items-center p-3 lg:p-4 lg:m-2 xl:m-4 xl:p-6 w-full">
        <ShareLink authId={user.sub} />
        <PersonalInfo profile={profile} refreshCallback={refreshCallback} />
        <Podium />
        <Box m={4}>
          <Typography variant="subtitle1" color="inherit" className='font-bold'>
            Average Score: {profile.average}
          </Typography>
          <Typography variant="subtitle1" color="inherit" className='font-bold'>
            High Score: {profile.highScore}
          </Typography>
          <Typography variant="subtitle1" color="inherit" className='font-bold'>
            Lowest Score: {profile.lowScore}
          </Typography>
        </Box>
        <UploadHistory profile={profile} />
      </div>
      <div className="flex flex-col justify-center text-center items-center p-3 lg:p-4 lg:m-2 xl:m-4 xl:p-6 w-full">
        <Leaderboard profile={profile} />
      </div>
    </div>
  )
};

export default Profile;