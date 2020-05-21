// @flow
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider,
  Dialog,
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
  const [open, setOpen] = useState(false);

  return (
    <>
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
                        <Button
                          className={classes.button}
                          onClick={() => setOpen(true)}
                        >
                          Setup
                        </Button>
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
                          onClick={() =>
                            history.push('/settings/change-password')
                          }
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
      {/** Popup Dialog for 2FA */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <Box mt={4} p={4}>
          <Typography align="center">
            To increase your account security, please enable 2FA.
          </Typography>
          <Grid container justify="center">
            <Box
              width="60%"
              mt={4}
              p={4}
              border={1}
              borderColor="grey.300"
              component="button"
              onClick={() => history.push('/settings/setup-2fa')}
            >
              <Grid container>
                asd
                <Grid item>
                  <b>Google Authenticator</b>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Box pt={4}>
            <Button onClick={() => setOpen(false)}>Skip for now</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default SettingsLandingPage;
