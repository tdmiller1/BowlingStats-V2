import React, { useState } from "react";
import { Camera, Edit2, X } from "react-feather";
import {
  Typography,
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  Button,
  Box,
  TextField,
} from "@material-ui/core";
import ImageUploading from "react-images-uploading";

const NotificationsSubmissionTableRow = ({
  sender,
  receiver,
  type,
  data,
  refreshData,
}) => {
  const handleSubmission = () => {
    setPhotoDialog(true);
  };

  const handleEdit = () => {
    setSubmissionResponseDialog(true);
  };

  const handleDelete = () => {
    // Send delete call
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

  const [photoDialog, setPhotoDialog] = useState(false);
  const [submissionResponseDialog, setSubmissionResponseDialog] =
    useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPhotoDialog(false);
    setSubmissionResponseDialog(false);
  };
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const submitImage = () => {
    // Submit Image to API
    handleClose();
    refreshData();
  };

  const submitStatement = () => {
    // Submit Text Statement to API
    handleClose();
    refreshData();
  };

  const [submissionText, setSubmissionText] = useState("");

  return (
    <>
      <TableRow key={sender}>
        <TableCell align="center">
          <Typography variant="body1" gutterBottom>
            Bowling Stats Admin
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" gutterBottom>
            {formatType(type)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Upload Photo Submission">
            <IconButton
              color="primary"
              align="center"
              onClick={handleSubmission}
            >
              <Camera />
            </IconButton>
          </Tooltip>
          <Tooltip title="Respond to the review request with a message">
            <IconButton color="primary" align="center" onClick={handleEdit}>
              <Edit2 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove incorrect game submission">
            <IconButton
              className="iconButton-trash"
              color="secondary"
              align="center"
              onClick={handleDelete}
            >
              <X />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {submissionResponseDialog && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open
        >
          <Box margin={4}>
            <Box margin={4}>
              <Typography variant="h6">
                Please give a reason for not submitting a photo as proof
              </Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Provide reason..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />
            <Box
              margin={2}
              display="flex"
              flexDirection="column"
              justifyItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={submitStatement}
              >
                Submit Statement for Review
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
      {photoDialog && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open
        >
          <Box margin={4}>
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="space-between"
                  padding={2}
                >
                  <Typography variant="h4">
                    Submit Photo of Game Score
                  </Typography>
                  <Box
                    padding={2}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    {imageList?.length === 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop image here
                      </Button>
                    )}
                    {imageList.map((image, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <img src={image.data_url} alt="" width="100%" />
                        <Box key={index} display="flex" flexDirection="row">
                          <Box margin={2}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update Image
                            </Button>
                          </Box>
                          <Box margin={2}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove Image
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitImage}
                  >
                    Submit Image for Review
                  </Button>
                </Box>
              )}
            </ImageUploading>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default NotificationsSubmissionTableRow;
