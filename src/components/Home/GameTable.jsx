import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography } from '@material-ui/core';
import GameRow from './GameRow';

const GameTable = ({ games, refreshCallback }) => {

  const deleteGameCallback = () => refreshCallback();

  const renderGames = ({_id, score, date}) =>(
    <GameRow key={_id}
      _id={_id}
      score={score}
      date={date}
      deleteGameCallback={deleteGameCallback} />
  )

  return (
    <Grid alignItems="stretch" justify="center" className="GameTable" direction='row' container >
      <Table stickyHeader >
        <TableHead>
            <TableRow>
              <TableCell className="GameTable-Header" align="center">
                <Typography variant="h6" gutterBottom>
                  Score
                </Typography>
              </TableCell>
              <TableCell className="GameTable-Header" align="center">
                <Typography variant="h6" gutterBottom>
                  Date
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {games.map(renderGames)}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default GameTable;

