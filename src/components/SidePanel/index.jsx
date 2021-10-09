import React, { useState } from "react";
import DayPicker from "react-day-picker";
import { Button, TextField, Snackbar } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import "./SidePanel.scss";
import "react-day-picker/lib/style.css";
import { addGame } from "../../utils/gameApi";

const SidePanel = ({ theme, addGameCallback }) => {
  let history = useHistory();
  const [gameScore, setGameScore] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useAuth0();

  const handleDayClick = (day, { selected }) => {
    if (day < new Date()) {
      setSelectedDay(selected ? undefined : day);
    }
  };

  const resetGameInfo = () => {
    setGameScore(null);
    setErrorMessage(null);
    addGameCallback();
  };

  const handleSubmit = () => {
    if (gameScore === null || gameScore === 0) {
      setErrorMessage("Enter Game Score");
    } else if (selectedDay === null || selectedDay === undefined) {
      setErrorMessage("Enter Date of Game");
    } else {
      addGame(user.sub, gameScore, selectedDay).then((result) => {
        result.error ? setErrorMessage(result.error) : resetGameInfo();
        if (result.response.data.flaggedForReview) {
          flaggedForSubmissionAlert();
        }
      });
    }
  };

  const [open, setOpen] = React.useState(false);

  const flaggedForSubmissionAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="SidePanel">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          className="SidePanel-input"
          InputProps={{ inputProps: { min: 1, max: 300 } }}
          type="number"
          variant="outlined"
          value={gameScore || ""}
          placeholder="Score"
          onChange={(e) => setGameScore(parseInt(e.target.value, 10) || 0)}
        />
        <DayPicker
          className="SidePanel-DayPicker"
          required
          selectedDays={selectedDay}
          onDayClick={handleDayClick}
          disabledDays={[
            {
              after: new Date(),
              before: new Date(2100, 3, 25),
            },
          ]}
        />
        <Button
          className="SidePanel-SubmitButton iconButton"
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Game
        </Button>
        {errorMessage && <h3>{errorMessage}</h3>}
      </form>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={10000}
        onClose={handleClose}
        variant="filled"
        severity="info"
        onClick={() => history.push("/home/notifications")}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="info"
        >
          Your game submission has been flagged for review. Your score was so
          good we deem it necessary to confirm. Check your notifications page
          for details!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SidePanel;
