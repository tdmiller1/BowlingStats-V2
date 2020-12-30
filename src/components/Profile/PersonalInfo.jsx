import React from 'react';

const PersonalInfo = () => {
  return (
    <div className='flex flex-row mb-4 pb-4'>
    <img className='Profile-Picture' src='https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--512.png' />
    <div className='flex w-full text-center justify-evenly flex-col'>
      <div>
      Tucker Miller
      </div>
      <div>
        United States
      </div>
    </div>
  </div>
  );
}

export default PersonalInfo;