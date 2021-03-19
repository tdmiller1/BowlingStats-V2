import React from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';

const LeaderboardTableRow = ({ username, average, maxScore, rank }) => {
  return (
    <TableRow key={rank}>
      <TableCell className="Leaderboard-Table-Row" align="center">
        <Typography variant="body1" gutterBottom>
          {username}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {average}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {maxScore}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default LeaderboardTableRow;