import React, { useEffect, useState, useCallback } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Hidden, Drawer } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import Profile from '../Profile/index';
import Header from '../Header';
import SidePanel from '../SidePanel';
import Dashboard from './Dashboard';
import { pullGames, getUserInfo } from '../../utils/gameApi';
import Notifications from '../Notifications/index';

const Home = (props) => {
  const { theme } = props;
  const [games, setGames] = useState([]);
  const [profile, setProfile] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  const refreshGames = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      pullGames(user.sub, token).then(e => setGames(e.response?.data?.games?.reverse()))
    });
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    refreshGames();
  },[refreshGames, getAccessTokenSilently]);

  const pullProfile = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      getUserInfo(user.sub, token).then(e => {
        if(e.response?.data) {
          setProfile(e.response.data.user[0]);
        }
      })
    });
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    pullProfile();
  },[pullProfile])

  const [ drawerOpen, setDrawerOpen ] = useState(false);
  let { path } = useRouteMatch();

  function toggleDrawer(){
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>
      <Header toggleDrawer={toggleDrawer} {...props}/>
      <Hidden only={["md","lg","xl"]}>
        <Drawer className={`Drawer-${theme}`} open={drawerOpen} onClose={toggleDrawer}>
          <SidePanel {...props} addGameCallback={refreshGames} />
        </Drawer>
      </Hidden>
      <Switch>
        <Route exact path={`${path}`}>
          <div className="flex">
            <Hidden only={["xs", "sm"]}>
              <SidePanel {...props} addGameCallback={refreshGames} />
            </Hidden>
            <Dashboard refreshCallback={refreshGames} games={games} {...props} />
          </div>
        </Route>
        <Route path={`${path}/profile`}>
          <Profile profile={profile} {...props} />
        </Route>
        {profile &&
          <Route path={`${path}/notifications`}>
            <Notifications profile={profile} refreshCallback={pullProfile} {...props} />
          </Route>
        }
      </Switch>
    </>
  )
}

export default Home;