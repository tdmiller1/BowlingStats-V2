import React, { useEffect, useState } from "react";
import { Check, X } from "react-feather";
import {
  Typography,
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import {
  getPlayerName,
  acceptFriendRequest,
  removeNotification,
  removeFriend,
} from "../../utils/gameApi";

const NotificationsTableRow = ({
  sender,
  receiver,
  type,
  data,
  refreshData,
}) => {
  const [playerName, setPlayerName] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    getPlayerName(sender).then((result) =>
      setPlayerName(result.response?.data?.playerName)
    );
  }, [user, sender]);

  const handleAccept = () => {
    acceptFriendRequest(receiver, sender).then(() => {
      acceptFriendRequest(sender, receiver).then(() => {
        removeNotification(receiver, sender, data).then(() => {
          refreshData();
        });
      });
    });
  };

  const handleDeny = () => {
    removeFriend(receiver, sender).then(() => {
      removeNotification(receiver, sender, data).then(() => {
        refreshData();
      });
    });
  };

  function formatType(type) {
    switch (type) {
      case "friendRequest":
        return "Friend Request";
      case "gameSubmissionReview":
        return "Review Required";
      default:
        return "";
    }
  }

  return (
    <TableRow key={sender}>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {playerName}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1" gutterBottom>
          {formatType(type)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Accept friend request">
          <IconButton
            className="iconButton-accept"
            color="primary"
            align="center"
            onClick={handleAccept}
          >
            <Check />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deny friend request">
          <IconButton
            className="iconButton-trash"
            color="secondary"
            align="center"
            onClick={handleDeny}
          >
            <X />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default NotificationsTableRow;
