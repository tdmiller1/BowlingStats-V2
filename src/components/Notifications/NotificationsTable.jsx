import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography } from '@material-ui/core';
import NotificationsTableRow from './NotificationsTableRow';

const NotificationsTable = ({ notifications, refreshCallback }) => {

  const renderGames = ({sender, receiver, type, data}) =>(
    <NotificationsTableRow key={sender}
      sender={sender}
      receiver={receiver}
      type={type}
      data={data}
      refreshData={refreshCallback} />
  )

  return (
    <Grid alignItems="stretch" justify="center" className="GameTable" direction='row' container >
      <Table stickyHeader >
        <TableHead>
            <TableRow>
              <TableCell className="GameTable-Header" align="center">
                <Typography variant="h6" gutterBottom>
                  Player Name
                </Typography>
              </TableCell>
              <TableCell className="GameTable-Header" align="center">
                <Typography variant="h6" gutterBottom>
                  Type
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {notifications && notifications.map(renderGames)}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default NotificationsTable;

