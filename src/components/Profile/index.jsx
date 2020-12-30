import React from 'react';
import PersonalInfo from './PersonalInfo';
import Podium from './Podium';
import UploadHistory from './UploadHistory';
import Leaderboard from './Leaderboard';
import "./Profile.scss";

const Profile = () => {

  return (
    <div className='flex flex-col md:flex-row m-8 justify-evenly'>
      <div className="Profile-Section text-center items-center p-8 m-8 w-full">
        <PersonalInfo />
        <Podium />
        <UploadHistory />
      </div>
      <div className="Profile-Section text-center items-center p-8 m-8 w-full">
        <Leaderboard />
      </div>
    </div>
  )
};

export default Profile;