import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import {
  getPublicPlayerData,
  sendFriendRequest,
  removeFriend,
} from "../../utils/gameApi";

const PublicProfile = ({ refreshCallback }) => {
  const { user } = useAuth0();
  const [playerData, setPlayerData] = useState({});
  const urlPathName = window.location.pathname;
  const playerUID = urlPathName.split("/u/").pop();

  async function refreshPlayerData() {
    refreshCallback();
    const result = await getPublicPlayerData(user.sub, playerUID);
    setPlayerData(result.response?.data);
  }

  useEffect(() => {
    refreshPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = useMemo(() => {
    return !!playerData?.message;
  }, [playerData]);

  const decodePlayerUID = decodeURIComponent(playerUID.replace(/\+/g, " "));

  const handleAddFriend = async () => {
    await sendFriendRequest(user.sub, decodePlayerUID, {});
    refreshPlayerData();
  };

  const handleRemoveFriend = async () => {
    await removeFriend(user.sub, decodePlayerUID);
    refreshPlayerData();
  };

  return (
    <div className="flex flex-col lg:flex-row m-3 md:m-4 justify-evenly">
      {error && <div>Player not found</div>}
      {playerData && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {playerData.playerName}
            </Typography>
            <Typography>HighScore: {playerData.highScore}</Typography>
            <Typography>LowScore: {playerData.lowScore}</Typography>
            <Typography variant="body2" component="p">
              FriendCount: {playerData.friendCount}
            </Typography>
          </CardContent>
          <CardActions>
            {playerData.isSelf && <div>Yourself</div>}
            {playerData.isFriend && (
              <Button size="small" onClick={handleRemoveFriend}>
                Remove Friend
              </Button>
            )}
            {!playerData.isFriend && !playerData.isSelf && (
              <Button size="small" onClick={handleAddFriend}>
                Add Friend
              </Button>
            )}
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default PublicProfile;
