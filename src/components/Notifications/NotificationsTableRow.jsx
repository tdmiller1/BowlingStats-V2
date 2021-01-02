import React, { useEffect, useState } from 'react';
import { Check, X } from 'react-feather';
import {Typography, TableCell, TableRow, IconButton} from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react';

import { getPlayerName, acceptFriendRequest } from '../../utils/gameApi';

const NotificationsTableRow = ({_id, playerId, type, deleteGameCallback}) => {
  const [playerName, setPlayerName] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getPlayerName(playerId, token).then(result => {console.log(result); setPlayerName(result.response?.data?.playerName)})
    });
  }, [playerId, getAccessTokenSilently]);

  const handleAccept = () => {
    acceptFriendRequest(playerId).then((e) => console.log(e) )
  };

  const handleDeny = () => {
    // deleteGame(_id).then(() => deleteGameCallback() )
  };

  return (
    <TableRow key={_id}>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {playerName}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {type}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton title="Accept" className="iconButton-accept" color="primary" align="center" onClick={handleAccept}>
            <Check />
        </IconButton>
        <IconButton title="Delete" className="iconButton-trash" color="secondary" align="center" onClick={handleDeny}>
            <X />
        </IconButton>
        </TableCell>
    </TableRow>
  )
}

export default NotificationsTableRow;