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
        setSubmissions(response.response.submissions);
      }
    });
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  function handleSubmission(status) {
    gradeSubmission(selectedSubmission.id, status).then((response) => {
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
            key={submission?.id}
            onClick={() => {
              setSelectedSubmission(submission);
              openModal(true);
            }}
          >
            <Typography>{submission?.score}------</Typography>
            <Typography>{submission?.authId}------</Typography>
            <Typography>{submission?.dateSubmitted}</Typography>
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
            Score: {selectedSubmission?.score}
            <img src={selectedSubmission?.imgSrc} alt="submission" />
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
