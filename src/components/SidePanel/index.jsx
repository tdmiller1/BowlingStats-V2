import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import {Button,
  TextField,
  } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react';

import './SidePanel.scss';
import 'react-day-picker/lib/style.css';
import { addGame } from '../../utils/gameApi';

const SidePanel = ({theme, addGameCallback}) => {
  const [gameScore, setGameScore] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  const handleDayClick = (day, { selected }) => {
    if (day < new Date()) {
      setSelectedDay(selected ? undefined : day)
    }
  }

  const resetGameInfo = () => {
    setGameScore(null);
    setErrorMessage(null);
    addGameCallback();
  }

  const handleSubmit = () => {
    if(gameScore === null || gameScore === 0){
      setErrorMessage("Enter Game Score");
    }else if(selectedDay === null || selectedDay === undefined){
      setErrorMessage("Enter Date of Game");
    }else{
      getAccessTokenSilently().then((token) => {
        addGame(user.sub, gameScore, selectedDay, token).then(result => {
          result.error ? setErrorMessage(result.error) : resetGameInfo();
        })
      });
    }
  }

  return (
    <div className="SidePanel">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextField
          className="SidePanel-input"
          InputProps={{ inputProps: { min: 1, max: 300 } }}
          type="number"
          variant="outlined"
          value={gameScore || ''}
          placeholder="Score"
          onChange={e => setGameScore(parseInt(e.target.value,10) || 0)}
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
        <Button className="SidePanel-SubmitButton iconButton" variant="contained" color="primary" type="submit">Add Game</Button>
        {errorMessage && <h3>{errorMessage}</h3>}
      </form>
    </div>
  )
}

export default SidePanel;