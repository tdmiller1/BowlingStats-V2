import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Trash2 } from 'react-feather';
import {
  Button,
  Hidden,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Divider,
  Typography,
  IconButton
} from '@material-ui/core'
import { Chart } from 'primereact/chart'
import Figure from '../../assets/figure-1.jpg'
import { ReactComponent as Github } from '../../assets/github.svg'
import { ReactComponent as LinkedIn } from '../../assets/linkedin.svg'
import "./LandingPage.scss";

const LandingPage = () => {
    const { loginWithRedirect } = useAuth0();
    const data = {
        labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 6'],
        datasets: [
            {
                label: 'Scores',
                data: [250, 225, 270, 240, 275, 280],
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            },
            {
                label: 'Average',
                data: [250, 238, 248, 246,  252, 256],
                fill: false,
                backgroundColor: '#66BB6A',
                borderColor: '#66BB6A'
            }
        ]

    };
    return (
        <div>
        <Grid container className="LandingPage-container">
            <Grid className="LandingPage-header flex justify-between" item xs={12}>
                <Typography className="LandingPage-logoText" variant='h5'>BowlingStats</Typography>
                <div className="LandingPage-header-buttons">
                <Button
                    className="LandingPage-login"
                    onClick={() => loginWithRedirect()} >
                    Log in
                </Button>
                <Button
                    className="LandingPage-login-signup"
                    variant='contained'
                    color='secondary'
                    onClick={()=> loginWithRedirect()} >
                    Sign up
                </Button>
                </div>
            </Grid>

            <div className="flex flex-row">
                <Grid
                    alignItems="center"
                    justify="center"
                    direction="row"
                    container>
                    <div>
                        <Typography className="LandingPage-figureOneTitle" variant='h3'>Track and Save Bowling Games</Typography>
                        <Typography className="LandingPage-paragraph">
                            See real-time updates and tracking analytics for all of your recent and past games.
                            Table view and Graph view provided below.
                            <Hidden only={["sm","xs"]}>
                            View every game you have played and how you have improved.
                            Also can provide progression and deliver insight on how to improve your 10 frames.</Hidden>
                        </Typography>
                    </div>
                </Grid>

                <Hidden only={["xs"]}>
                    <Grid item xs={6}>
                        <img className="LandingPage-figure" src={Figure} alt='clipart-stats' />
                    </Grid>
                </Hidden>
            </div>

            <Grid container direction='row' justify="center">
                <Chart className="LandingPage-chart" type="line" data={data} />
            </Grid>

            <Grid container direction='row' justify='center'>
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
                        <TableCell align="center">March 6, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <Trash2 className="iconButton-trash" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">225</TableCell>
                        <TableCell align="center">March 13, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <Trash2 className="iconButton-trash" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">270</TableCell>
                        <TableCell align="center">March 20, 2019</TableCell>
                        <TableCell align="center">
                            <IconButton title="Delete">
                                <Trash2 className="iconButton-trash" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">240</TableCell>
                        <TableCell align="center">March 27, 2019</TableCell>
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

        <Grid container className="LandingPage-footer flex flex-col md:flex-row justify-between">
            <Hidden only={["xs"]}>
                <IconButton href="mailto:tuckerdanielmiller@gmail.com" style={{backgroundColor:'transparent'}} className="LandingPage-link">
                    contactUs@gmail.com
                </IconButton>
            </Hidden>

            <IconButton href="https://www.linkedin.com/in/tuckermiller7/" target="#" style={{backgroundColor:'transparent'}} className="LandingPage-link">
                <LinkedIn className="LandingPage-icon" />
                <Hidden only={["xs"]}>LinkedIn</Hidden>
            </IconButton>

            <IconButton href="https://github.com/tdmiller1" target="#" style={{backgroundColor:'transparent'}} className="LandingPage-link">
                <Github className="LandingPage-icon" />
                <Hidden only={["xs"]}>GitHub</Hidden>
            </IconButton>

            <IconButton href="https://tuckermillerdev.com" target="#" style={{backgroundColor:'transparent'}} className="LandingPage-link">
                &copy;TuckerMillerDev
            </IconButton>
        </Grid>
        </div>
    )
}

export default LandingPage;