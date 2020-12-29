import React, {useState} from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Hidden, Drawer } from '@material-ui/core';
import Profile from '../Profile';
import Header from '../Header';
import SidePanel from '../SidePanel'

const Home = (props) => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  let { path } = useRouteMatch();

  function toggleDrawer(){
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>
      <Header toggleDrawer={toggleDrawer} {...props}/>
      <Hidden only={["md","lg","xl"]}>
        <Drawer open={drawerOpen} onClose={toggleDrawer}>
          <SidePanel {...props} />
        </Drawer>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
          <SidePanel {...props} />
      </Hidden>
      <Switch>
        <Route path={`${path}/profile`}>
          <Profile />
        </Route>
      </Switch>
    </>
  )
}

export default Home;