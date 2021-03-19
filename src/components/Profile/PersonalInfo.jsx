import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Edit } from 'react-feather';
import { TextField, IconButton, Button, Typography} from '@material-ui/core';

import { updatePlayerInfo } from '../../utils/gameApi';

const PersonalInfo = ({ profile, refreshCallback }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [editPlayername, setEditPlayername] = useState();
  const [editLocation, setEditLocation] = useState();
  const [isDirty, setIsDirty] = useState(false);
  const [message] = useState(profile?.message)

  const EditButton = () => {
    if(isDirty) {
    return <Button variant="contained" color="secondary" onClick={() => updateProfileInfo()}>submit</Button>
    }else {
      return <Button variant="contained" color="secondary" onClick={() =>
        setIsEditing(false)}>cancel</Button>
    }
  }

  const updateProfileInfo = () => {
    getAccessTokenSilently().then((token) => {
      updatePlayerInfo(user.sub, { playerName: editPlayername, location: editLocation }, token).then(e => {
        if(e.response?.data) {
          refreshCallback();
        }
      })
    });
    setIsEditing(false);
  }

  useEffect(() => {
    if(profile?.message) setIsEditing(true);
    setEditPlayername(profile?.playerName);
    setEditLocation(profile?.location);
  }, [profile]);

  useEffect(() => {
    profile?.playerName === editPlayername && profile?.location === editLocation ? setIsDirty(false) : setIsDirty(true);
  }, [profile, editPlayername, editLocation]);

  if(!profile) return null;

  return (
    <div className='flex flex-row mx-8 my-8 pb-4'>
      <div className="flex align-center">
        <img className='Profile-Picture' alt="avatar" src={user.picture} />
      </div>
      <div className='flex w-full text-center justify-evenly flex-row'>
        {!isEditing && message && (
          <>
            <div>No Data</div>
            <span>
              <IconButton onClick={() => setIsEditing(true)} title="Edit" className="iconButton float-right">
                <Edit />
              </IconButton>
            </span>
          </>
        )}
        {!isEditing && !message &&
          <>
            <div className='flex w-full text-center justify-evenly flex-col'>
              <Typography variant="subtitle1" color="inherit" className='font-bold'>
                {profile.playerName}
              </Typography>
              <Typography variant="subtitle1" color="inherit" className='font-bold'>
                {profile?.location}
              </Typography>
            </div>
            <span>
              <IconButton onClick={() => setIsEditing(true)} title="Edit" className="iconButton float-right">
                <Edit className="light-mode-darker" />
              </IconButton>
            </span>
          </>
        }
        {isEditing &&
          <div>
            <div className="my-4">
              <TextField id="playerNameText" label="Player Name" variant="outlined" value={editPlayername} onChange={e => setEditPlayername(e.target.value)} />
            </div>
            <div className="my-4">
              <TextField id="locationText" label="Location" variant="outlined" value={editLocation} onChange={e => setEditLocation(e.target.value)} />
            </div>
            <div>
              <EditButton />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default PersonalInfo;