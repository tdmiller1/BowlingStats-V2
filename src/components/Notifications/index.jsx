import React from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import NotificationsTable from './NotificationsTable';

const Notifications = ({ profile, refreshCallback }) => {

  const { notifications } = profile;

  return (
    <div className='flex flex-col lg:flex-row m-3 md:m-4 justify-evenly'>
      <Grid container className="GameChart-ParentGrid">
        {!_.isEmpty(notifications)  && <NotificationsTable notifications={notifications} refreshCallback={refreshCallback} />}
        {_.isEmpty(notifications) && <div>No Notifications</div>}
      </Grid>
    </div>
  )
};

export default Notifications;