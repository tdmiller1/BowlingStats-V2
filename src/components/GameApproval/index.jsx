import {
  Typography,
  ListItem,
  Dialog,
  Box,
  List,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { getSubmissions, gradeSubmission } from "../../utils/gameApi";

export default function GameApproval() {
  const [submissions, setSubmissions] = useState(null);
  const [modal, openModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const refreshData = useCallback(() => {
    getSubmissions().then((response) => {
      if (response.error === null) {
        setSubmissions(response.response.data);
      }
    });
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  function handleSubmission(status) {
    gradeSubmission(
      selectedSubmission.authId,
      selectedSubmission.submissionId,
      status,
      selectedSubmission.score,
      selectedSubmission.date
    ).then((response) => {
      if (response.error === null) {
        setSelectedSubmission(null);
        openModal(false);
        refreshData();
      }
    });
  }

  return (
    <>
      <List>
        {submissions?.map((submission) => (
          <ListItem
            button
            key={`${submission?.authId} ${submission?.date}`}
            onClick={() => {
              setSelectedSubmission(submission);
              openModal(true);
            }}
          >
            <Typography>{submission?.score}------</Typography>
            <Typography>{submission?.authId}------</Typography>
            <Typography>{new Date(submission?.date).toDateString()}</Typography>
          </ListItem>
        ))}
      </List>
      {modal && (
        <Dialog
          onClose={() => openModal(false)}
          aria-labelledby="simple-dialog-title"
          open
        >
          <Box
            margin={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography>Score: {selectedSubmission?.score}</Typography>
            {selectedSubmission?.imageUrl && (
              <img src={selectedSubmission?.imageUrl} alt="submission" />
            )}
            <Typography>
              {selectedSubmission?.statement &&
                `Statement: ${selectedSubmission?.statement}`}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={() => handleSubmission("approve")}
                variant="contained"
                color="primary"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleSubmission("deny")}
                variant="outlined"
                color="primary"
              >
                Deny
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
}
