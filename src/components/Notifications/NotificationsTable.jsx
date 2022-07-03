import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import NotificationsTableRow from "./NotificationsTableRow";
import NotificationsSubmissionTableRow from "./NotificationsSubmissionTableRow";

const NotificationsTable = ({ notifications, refreshCallback }) => {
  const renderNotifications = ({
    sender,
    receiver,
    type,
    data,
    score,
    date,
    _id: submissionId,
  }) => {
    if (type === "gameSubmissionReview") {
      return (
        <NotificationsSubmissionTableRow
          key={`${date}_${score}_${type}`}
          submissionId={submissionId}
          type={type}
          data={data}
          date={date}
          score={score}
          refreshData={refreshCallback}
        />
      );
    }
    return (
      <NotificationsTableRow
        key={`${sender}_${receiver}_${type}`}
        sender={sender}
        receiver={receiver}
        type={type}
        data={data}
        refreshData={refreshCallback}
      />
    );
  };

  return (
    <Grid
      alignItems="stretch"
      justify="center"
      className="GameTable"
      direction="row"
      container
    >
      <Table stickyHeader>
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
          {notifications && notifications.map(renderNotifications)}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default NotificationsTable;
