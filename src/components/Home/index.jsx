import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Hidden, Drawer } from '@material-ui/core';
import Profile from '../Profile/index';
import Header from '../Header';
import SidePanel from '../SidePanel';
import Dashboard from './Dashboard';
import { pullGames } from '../../utils/gameApi';

const Home = (props) => {
  const { theme } = props;
  const [games, setGames] = useState([]);

  const refreshGames = () => {
    pullGames().then(e => setGames(e.response.data.games.reverse()))
  }

  useEffect(() => {
    refreshGames();
  },[]);

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
          <Profile {...props} />
        </Route>
      </Switch>
    </>
  )
}

export default Home;