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

  const deleteGameCallback = () => refreshCallback();

  const renderGames = ({_id, playerId, type}) =>(
    <NotificationsTableRow key={_id}
      _id={_id}
      playerId={playerId}
      type={type}
      deleteGameCallback={deleteGameCallback} />
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

