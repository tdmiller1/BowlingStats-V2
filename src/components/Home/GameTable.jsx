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
import GameRow from "./GameRow";
import { useWindowSize } from "../../utils/useWindowSize";

const GameTable = ({ games, refreshCallback }) => {
  const deleteGameCallback = () => refreshCallback();
  const size = useWindowSize();

  const renderGames = ({ _id, score, date }) => (
    <GameRow
      key={_id}
      _id={_id}
      score={score}
      date={date}
      deleteGameCallback={deleteGameCallback}
    />
  );
  console.log(size);
  return (
    <Grid
      alignItems="stretch"
      justify="center"
      className="GameTable"
      direction="row"
      container
    >
      {games?.length === 0 && (
        <div className="text-center m-2">
          <span className="m-4">
            <Typography
              variant="h5"
              component="h5"
              color="inherit"
              className="font-bold"
            >
              Oops you don't have any games logged
            </Typography>
          </span>
          {size.width < 960 && (
            <Typography
              variant="h5"
              component="h5"
              color="inherit"
              className="font-bold"
            >
              Click the + in the corner to begin
            </Typography>
          )}
        </div>
      )}
      {games?.length !== 0 && (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="GameTable-Header" align="center">
                <Typography variant="h6" gutterBottom>
                  Score
                </Typography>
              </TableCell>
              <TableCell className="GameTable-Header" align="center">
                <Typography variant="h6" gutterBottom>
                  Date
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{games?.map(renderGames)}</TableBody>
        </Table>
      )}
    </Grid>
  );
};

export default GameTable;
