import React, { useCallback, useEffect, useState } from 'react';
import { Globe, Users } from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';
import {
  BottomNavigation,
  BottomNavigationAction } from '@material-ui/core';
import LeaderboardTable from "./LeaderboardTable";

import { getUserInfo } from '../../utils/gameApi';

const LEADERBOARD = {
  FRIENDS: 'friends',
  GLOBAL: 'global',
}

const Leaderboard = ({ profile }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [value, setValue] = useState(LEADERBOARD.FRIENDS);
  const [friendData, setFriendData] = useState([]);
  const { friends } = profile;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function serializePlayer(player) {
    return {
      username: player.playerName,
      maxScore: player.highScore,
      average: player.average
    }
  }

  const innerFunction = useCallback((friends) => {
    friends.forEach(friend => {
      getAccessTokenSilently().then((token) => {
        getUserInfo(friend.authId, token).then(e => {
          if(e.response?.data) {
            setFriendData(oldArray => [...oldArray, serializePlayer(e.response.data)]);
          }
        })
      });
    })
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if(friends.length > 0) {
      setFriendData([]);
      innerFunction(friends);
    }
  }, [friends, innerFunction])

  const globalUsers = [
    {
      username: 'Coming Soon',
      maxScore: 300,
      average: 300
    }
  ]

  const defaultFriendData = [
    {
      username: 'Add a friend to compare',
      maxScore: 300,
      average: 300
    }
  ]

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Friends" value={LEADERBOARD.FRIENDS} icon={<Users />} />
        <BottomNavigationAction label="Global" value={LEADERBOARD.GLOBAL} icon={<Globe />} />
      </BottomNavigation>
      {value === LEADERBOARD.FRIENDS && friendData.length > 0 && <LeaderboardTable users={friendData} />}
      {value === LEADERBOARD.FRIENDS && friendData.length === 0 && <LeaderboardTable users={defaultFriendData} />}
      {value === LEADERBOARD.GLOBAL && <LeaderboardTable users={globalUsers} />}
    </>
  );
}

export default Leaderboard;
