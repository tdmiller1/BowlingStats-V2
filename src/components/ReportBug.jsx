import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

const My404Component = () => {
  return (
    <div className="p-8">
      <Grid className="w-screen flex-grow text-center justify-center" container direction="column" alignItems="center" justify="center" spacing={4}>
        <Grid item>
          <Typography variant="h4" component="h4" color="inherit" className='font-bold'>
            See something that just seems off? Help us out.
          </Typography>
          <div className="m-8">
            <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeZYrxWUPMfv8J_dDbu_17otulN9uZKTsJkCS6TBhBeW3YbCQ/viewform?usp=sf_link">
              <Button variant="contained" color="secondary">
                Report a bug
              </Button>
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default My404Component;