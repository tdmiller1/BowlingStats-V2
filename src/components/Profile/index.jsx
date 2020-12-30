import React from 'react';
import PersonalInfo from './PersonalInfo';
import Podium from './Podium';
import UploadHistory from './UploadHistory';
import Leaderboard from './Leaderboard';
import "./Profile.scss";

const Profile = () => {

  return (
    <div className='flex flex-col lg:flex-row m-3 md:m-4 justify-evenly'>
      <div className="Profile-Section text-center items-center p-3 lg:p-4 lg:m-2 xl:m-4 xl:p-6 w-full">
        <PersonalInfo />
        <Podium />
        <UploadHistory />
      </div>
      <div className="flex flex-col justify-center text-center items-center p-3 lg:p-4 lg:m-2 xl:m-4 xl:p-6 w-full">
        <Leaderboard />
      </div>
    </div>
  )
};

export default Profile;