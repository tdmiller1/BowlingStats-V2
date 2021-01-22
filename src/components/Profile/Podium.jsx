import React from 'react';

const Podium = () => {
  return (
    <div className='flex justify-center pt-4 mt-4'>
      <div className='flex items-end'>
        <div className='Profile-second'><div className="Profile-PodiumResult">2nd</div></div>
        <div className='Profile-first'><div className="Profile-PodiumResult">1st</div></div>
        <div className='Profile-third'><div className="Profile-PodiumResult">3rd</div></div>
      </div>
    </div>
  );
}
export default Podium;