import React from 'react';
import { Typography } from '@material-ui/core';

const UploadHistory = ({ profile }) => {
  if(!profile) return null;

  const loginDate = new Date(profile?.initialLogin);

  return (
    <div className='flex flex-row pt-4 mt-4 mb-4 pb-4'>
      <div className='flex w-full text-center justify-evenly flex-col'>
        {profile?.gameCount && (
          <Typography variant="subtitle1" color="inherit" className='font-bold'>
            Games Logged: {profile?.gameCount}
          </Typography>
        )}
        {profile?.initialLogin && (
          <Typography variant="subtitle1" color="inherit" className='font-bold'>
            Active Member Since: {loginDate.getMonth() + 1 + '/' + loginDate.getDay() + '/' + loginDate.getFullYear()}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default UploadHistory;