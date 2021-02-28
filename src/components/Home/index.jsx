import React, { useEffect, useState, useCallback } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Hidden, Drawer } from '@material-ui/core';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import Profile from '../Profile/index';
import Header from '../Header';
import SidePanel from '../SidePanel';
import Dashboard from './Dashboard';
import { getUserInfo } from '../../utils/gameApi';
import Notifications from '../Notifications/index';
import PublicProfile from '../PublicProfile/index';
import ReportBug from '../ReportBug';

const Home = (props) => {
  const { theme } = props;
  const [games, setGames] = useState([]);
  const [profile, setProfile] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  const refreshData = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      getUserInfo(user.sub, token).then(e => {
        if(e.response?.data) {
          setProfile(e.response.data);
          setGames(e.response?.data?.games?.reverse());
        }
      })
    });
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    refreshData();
  },[refreshData])

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
          <SidePanel {...props} addGameCallback={refreshData} />
        </Drawer>
      </Hidden>
      <Switch>
        <Route exact path={`${path}`}>
          <div className="flex">
            <Hidden only={["xs", "sm"]}>
              <SidePanel {...props} addGameCallback={refreshData} />
            </Hidden>
            <Dashboard refreshCallback={refreshData} games={games} {...props} />
          </div>
        </Route>
        <Route path={`${path}/profile`}>
          <Profile profile={profile} {...props} refreshCallback={refreshData} />
        </Route>
        {profile && (
          <>
            <Route path={`${path}/notifications`}>
              <Notifications refreshCallback={refreshData} profile={profile} setProfile={setProfile} {...props} />
            </Route>
            <Route path={`${path}/u/`}>
              <PublicProfile refreshCallback={refreshData} />
            </Route>
            <Route path={`${path}/bug`}>
              <ReportBug />
            </Route>
          </>
          )}
      </Switch>
    </>
  )
}

export default withAuthenticationRequired(Home, {
  onRedirecting: () => <div>Loading</div>,
});