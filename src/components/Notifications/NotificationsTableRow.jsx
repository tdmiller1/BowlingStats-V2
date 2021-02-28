import React, { useEffect, useState } from 'react';
import { Check, X } from 'react-feather';
import {Typography, TableCell, TableRow, IconButton} from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react';

import { getPlayerName, acceptFriendRequest, removeNotification, removeFriend } from '../../utils/gameApi';

const NotificationsTableRow = ({sender, receiver, type, data, refreshData}) => {
  const [playerName, setPlayerName] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getPlayerName(sender, token).then(result => setPlayerName(result.response?.data?.playerName))
    });
  }, [user, sender, getAccessTokenSilently]);

  const handleAccept = () => {
    getAccessTokenSilently().then((token) => {
      acceptFriendRequest(receiver, sender, token).then(() => {
        acceptFriendRequest(sender, receiver, token).then(() => {
          removeNotification(receiver, sender, data, token).then(() =>{
            refreshData();
          })
        });
      })
    });
  };

  const handleDeny = () => {
    getAccessTokenSilently().then((token) => {
      removeFriend(receiver, sender, token).then(() => {
        removeNotification(receiver, sender, data, token).then(() =>{
          refreshData();
        })
      })
    });
  };

  return (
    <TableRow key={sender}>
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