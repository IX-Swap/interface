// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider,
} from '@material-ui/core';
import PageTitle from 'components/PageTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold',
    width: '100px',
  },
}));

const SettingsLandingPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const onClickChangePassword = (e) => {
    e.preventDefault();

    history.push('/settings/change-password');
  };

  return (
    <Container>
      <PageTitle title="Settings" />
      <Box marginTop={5}>
        <Paper elevation={0}>
          <Box p={2}>
            <Typography variant="h6">Security</Typography>
          </Box>
          <Divider />
          <Container>
            <Grid container alignItems="center" justify="center">
              <Box width="60%">
                <Box mt={5} mb={3}>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <b>Google Authenticator</b>
                    </Grid>
                    <Grid item>
                      <Button className={classes.button}>Setup</Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box mb={5}>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <b>Password</b>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={onClickChangePassword}
                        className={classes.button}
                      >
                        Change
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Divider />

            <Grid container alignItems="center" justify="center">
              <Box width="60%" mt={5} mb={5}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <b>Currency</b>
                  </Grid>
                  <Grid item>
                    <Button>SGD</Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};

export default SettingsLandingPage;
