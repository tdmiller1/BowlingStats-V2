import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Trash2 } from "react-feather";
import {
  Button,
  Chip,
  Box,
  Hidden,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Divider,
  Typography,
  IconButton,
  withWidth,
} from "@material-ui/core";
import { Chart } from "primereact/chart";
import Figure from "../../assets/figure-1.jpg";
import "./LandingPage.scss";
import { Router } from "react-router-dom";

const LandingPage = ({ width }) => {
  const { loginWithRedirect } = useAuth0();
  const data = {
    labels: ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5", "Game 6"],
    datasets: [
      {
        label: "Scores",
        data: [250, 225, 270, 240, 275, 280],
        fill: false,
        backgroundColor: "#42A5F5",
        borderColor: "#42A5F5",
      },
      {
        label: "Average",
        data: [250, 238, 248, 246, 252, 256],
        fill: false,
        backgroundColor: "#66BB6A",
        borderColor: "#66BB6A",
      },
    ],
  };
  return (
    <div>
      <Grid container className="LandingPage-container">
        <Grid className="LandingPage-header flex justify-between" item xs={12}>
          {width !== "xs" && (
            <Typography className="LandingPage-logoText" variant="h5">
              BowlingStats
            </Typography>
          )}
          <Box marginBottom={width === "xs" ? 3 : 0}>
            <div className="LandingPage-header-buttons">
              <Button
                variant="outlined"
                color="secondary"
                className="LandingPage-login"
                onClick={() => {
                  loginWithRedirect();
                }}
              >
                <Typography variant="button">Log in</Typography>
              </Button>
              <Button
                className="LandingPage-login-signup"
                variant="contained"
                color="secondary"
                onClick={() => loginWithRedirect()}
              >
                <Typography variant="button">Sign up</Typography>
              </Button>
            </div>
          </Box>
        </Grid>

        <div className="flex flex-row">
          <Grid alignItems="center" justify="center" direction="row" container>
            <div className="text-center">
              <Box marginBottom={2}>
                <Typography
                  className="LandingPage-figureOneTitle"
                  variant={width === "xs" ? "h4" : "h3"}
                >
                  Track and Save Bowling Games
                </Typography>
              </Box>

              <Grid container spacing={3} className="justify-center">
                <Grid item>
                  <Chip color="primary" label="Real-Time Updates" />
                </Grid>
                <Grid item>
                  <Chip color="primary" label="Compete With Friends" />
                </Grid>
                {width !== "xs" && (
                  <>
                    <Grid item>
                      <Chip label="Track Games Over Time" />
                    </Grid>
                    <Grid item>
                      <Chip label="Analyze Progress" />
                    </Grid>
                  </>
                )}
              </Grid>
              <Box
                marginTop={4}
                marginBottom={4}
                display="flex"
                justifyContent="center"
              >
                <Button
                  className="LandingPage-login-signup"
                  variant="contained"
                  color="secondary"
                  onClick={() => loginWithRedirect()}
                >
                  <Typography variant="button">
                    Click here to get started today!
                  </Typography>
                </Button>
              </Box>
            </div>
          </Grid>

          <Hidden only={["xs"]}>
            <Grid item xs={6}>
              <img
                className="LandingPage-figure"
                src={Figure}
                alt="Bowling Stats Clipart"
              />
            </Grid>
          </Hidden>
        </div>

        {/* <Hidden only={["xs"]}> */}
        <Grid container direction="row" justify="center">
          <Chart className="LandingPage-chart" type="line" data={data} />
        </Grid>
        {/* </Hidden> */}

        <Grid container direction="row" justify="center">
          <Table className="LandingPage-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">250</TableCell>
                <TableCell align="center">March 6, 2023</TableCell>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <Trash2 className="iconButton-trash" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">225</TableCell>
                <TableCell align="center">January 13, 2023</TableCell>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <Trash2 className="iconButton-trash" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">270</TableCell>
                <TableCell align="center">July 20, 2022</TableCell>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <Trash2 className="iconButton-trash" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">240</TableCell>
                <TableCell align="center">March 27, 2021</TableCell>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <Trash2 className="iconButton-trash" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">275</TableCell>
                <TableCell align="center">April 3, 2019</TableCell>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <Trash2 className="iconButton-trash" />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">280</TableCell>
                <TableCell align="center">April 10, 2019</TableCell>
                <TableCell align="center">
                  <IconButton title="Delete">
                    <Trash2 className="iconButton-trash" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>

      <Grid className="LandingPage-divider">
        <Divider />
      </Grid>
    </div>
  );
};

export default withWidth()(LandingPage);
