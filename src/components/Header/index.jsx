import React, { useMemo } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { Home, Plus, LogOut, User } from 'react-feather';
import { AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import DarkModeToggle from '../DarkModeToggle';
import './Header.scss';

function logout(){
  console.log('logout')
}

const Header = ({ theme, toggleTheme, toggleDrawer }) => {
  let { url } = useRouteMatch();

const isProfilePage = useMemo(() => window.location.pathname.includes("profile"),
//eslint-disable-next-line
[window.location.pathname])

return (
    <AppBar position='static'>
      <Toolbar className="themedToolbar flex justify-between">
        <div className='flex items-center'>
            <Hidden only={["md","lg","xl"]}>
            <IconButton color='inherit' onClick={toggleDrawer}>
              <Plus />
            </IconButton>
          </Hidden>
          <Typography variant="h5" component="h5" color="inherit" className='font-bold'>
            Bowling Stats
          </Typography>
        </div>
        <div className='flex items-center'>
          {!isProfilePage &&
            <Link to={`${url}/profile`}>
              <IconButton title="Profile" className="iconButton float-right">
                <User />
              </IconButton>
            </Link>
          }
          {isProfilePage &&
            <Link to={`${url}`}>
              <IconButton title="Home" className="iconButton float-right">
                <Home />
              </IconButton>
            </Link>
          }
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
          <IconButton title="Logout" color="inherit" className="auth-button" onClick={logout} >
            <LogOut />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;