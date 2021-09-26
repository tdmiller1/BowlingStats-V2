import React, { useEffect } from "react";
import _ from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography } from "@material-ui/core";
import NotificationsTable from "./NotificationsTable";

import { getUserInfo } from "../../utils/gameApi";

const Notifications = ({ refreshCallback, profile, setProfile }) => {
  const { user } = useAuth0();

  const refreshData = () => {
    getUserInfo(user.sub).then((e) => {
      if (e.response?.data) {
        setProfile(e.response.data);
      }
    });
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col lg:flex-row m-3 md:m-4 justify-evenly">
      <Grid container className="GameChart-ParentGrid">
        {!_.isEmpty(profile?.notifications) && (
          <NotificationsTable
            notifications={profile?.notifications}
            refreshCallback={refreshCallback}
          />
        )}
        {_.isEmpty(profile?.notifications) && (
          <Typography variant="subtitle1" color="inherit" className="font-bold">
            No Notifications
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Notifications;
