import React from 'react';

const UploadHistory = ({ profile }) => {
  if(!profile) return null;

  const loginDate = new Date(profile?.initialLogin);

  return (
    <div className='flex flex-row pt-4 mt-4 mb-4 pb-4'>
      <div className='flex w-full text-center justify-evenly flex-col'>
        {profile?.gameCount && (
          <div>
            Games Logged: {profile?.gameCount}
          </div>
        )}
        {profile?.initialLogin && (
          <div>
            Active Member Since: {loginDate.getMonth() + 1 + '/' + loginDate.getDay() + '/' + loginDate.getFullYear()}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadHistory;