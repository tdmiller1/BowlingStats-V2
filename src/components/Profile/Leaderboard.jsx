import React, { useState } from 'react';
import { Globe, Users } from 'react-feather';
import {
  BottomNavigation,
  BottomNavigationAction } from '@material-ui/core';
import LeaderboardTable from "./LeaderboardTable";

const LEADERBOARD = {
  FRIENDS: 'friends',
  GLOBAL: 'global',
}

const Leaderboard = () => {
  const [value, setValue] = useState(LEADERBOARD.FRIENDS);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const friends = [
    {
      username: 'tdmiller7',
      maxScore: 200,
      average: 30,
      rank: 696
    }
  ]

  const globalUsers = [
    {
      username: 'killa',
      maxScore: 300,
      average: 250,
      rank: 1
    }
  ]

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Friends" value={LEADERBOARD.FRIENDS} icon={<Users />} />
        <BottomNavigationAction label="Global" value={LEADERBOARD.GLOBAL} icon={<Globe />} />
      </BottomNavigation>
      {value === LEADERBOARD.FRIENDS && <LeaderboardTable users={friends} />}
      {value === LEADERBOARD.GLOBAL && <LeaderboardTable users={globalUsers} />}
    </>
  );
}

export default Leaderboard;
