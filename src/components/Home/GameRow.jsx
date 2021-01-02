import React from 'react';
import { Trash2 } from 'react-feather';
import moment from 'moment';
import {Typography, TableCell, TableRow, IconButton} from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react';

import { deleteGame } from '../../utils/gameApi';

const GameRow = ({_id, score, date, deleteGameCallback}) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = () => {
    getAccessTokenSilently().then((token) => {
      deleteGame(_id, token,).then(() => deleteGameCallback() )
    });
  };
  const parseDate = (date) => moment(date).format('MMMM DD, YYYY');

  return (
    <TableRow key={_id}>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {score}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {parseDate(date)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton title="Delete" className="iconButton-trash" color="secondary" align="center" onClick={handleDelete}>
            <Trash2 />
        </IconButton>
        </TableCell>
    </TableRow>
  )
}

export default GameRow;