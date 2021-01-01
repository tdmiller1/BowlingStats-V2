import React, { useMemo } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { Home, Plus, LogOut, User, Bell } from 'react-feather';
import { AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import DarkModeToggle from '../DarkModeToggle';
import './Header.scss';


const Header = ({ theme, toggleTheme, toggleDrawer, auth }) => {
  let { url } = useRouteMatch();

const notHomePage = useMemo(() =>
  window.location.pathname.includes("profile") || window.location.pathname.includes("notifications")
,
//eslint-disable-next-line
[window.location.pathname])

return (
    <AppBar position='static'>
      <Toolbar className="themedToolbar flex justify-between">
        <div className='flex items-center'>
            {!notHomePage &&
              <Hidden only={["md","lg","xl"]}>
              <IconButton color='inherit' onClick={toggleDrawer}>
                <Plus />
              </IconButton>
            </Hidden>
            }
          <Typography variant="h5" component="h5" color="inherit" className='font-bold'>
            Bowling Stats
          </Typography>
        </div>
        <div className='flex items-center'>
          <Link to={`${url}/profile`}>
            <IconButton title="Profile" className="iconButton float-right">
              <User />
            </IconButton>
          </Link>
          <Link to={`${url}`}>
            <IconButton title="Home" className="iconButton float-right">
              <Home />
            </IconButton>
          </Link>
          <Link to={`${url}/notifications`}>
            <IconButton title="Notifications" color="inherit" >
              <Bell />
            </IconButton>
          </Link>
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
          <IconButton title="Logout" color="inherit" className="auth-button" onClick={() => auth.logout()} >
            <LogOut />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;