import React from 'react';
import { Grid, Typography, Button} from '@material-ui/core';
import { Link } from "react-router-dom";

const My404Component = () => {
  return (
      <Grid className="h-screen w-screen flex-grow" container direction="column" alignItems="center" justify="center" spacing={4}>
        <Grid item>
          <Typography variant="h1" component="h1" color="inherit" className='font-bold'>
          Oops! 404
        </Typography></Grid>
        <Grid item>
        <Typography variant="h5" component="h5" color="inherit" className='font-bold'>
          We're sorry, the page you requested was not found
        </Typography></Grid>
        <Grid item>
        <Link to={`/login`}>
          <Button variant="contained" color="secondary">
            Back to site
          </Button>
        </Link></Grid>
      </Grid>
  )
}

export default My404Component;