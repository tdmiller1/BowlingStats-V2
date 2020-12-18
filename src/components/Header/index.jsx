import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { Plus, LogOut, User } from 'react-feather';
import { AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import DarkModeToggle from '../DarkModeToggle';

function logout(){
  console.log('logout')
}

const Header = ({ theme, toggleTheme, toggleDrawer }) => {
  let { url } = useRouteMatch();
return (
    <AppBar position='static'>
      <Toolbar>
        <Hidden only={["md","lg","xl"]}>
          <IconButton color='inherit' onClick={toggleDrawer}>
            <Plus />
          </IconButton>
        </Hidden>
        <Typography variant="h6" color="inherit">
          Bowling Stats
        </Typography>
        <Link to={`${url}/profile`}>
          <IconButton title="Profile" color="inherit">
            <User />
          </IconButton>
        </Link>
        <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
        <IconButton title="Logout" color="inherit" className="auth-button" onClick={logout} >
          <LogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;