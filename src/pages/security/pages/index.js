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
import { useUserState } from 'context/user';
import keyImg from '../assets/key.png';
import gAuthImg from '../assets/googleauth.png';

const useStyles = makeStyles(() => ({
  button: {
    fontWeight: 'bold',
    width: '100px',
  },
  logoImg: {
    height: '2.5em',
    marginRight: '1em',
  },
  btnImg: {
    height: '3rem',
    marginRight: '1.5em',
  },
  btnLabel: {
    fontSize: '0.95rem',
  },
  popupBtn: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const SettingsLandingPage = () => {
  const { user: { totpConfirmed = false } = {} } = useUserState();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(!totpConfirmed);

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
                      <Grid
                        container
                        item
                        alignItems="center"
                        justify="flex-start"
                        xs={8}
                      >
                        <Grid item>
                          <img
                            src={gAuthImg}
                            className={classes.logoImg}
                            alt="gAuth"
                          />
                        </Grid>
                        <Grid item>
                          <b>Google Authenticator</b>
                        </Grid>
                      </Grid>
                      <Grid item container justify="flex-end" xs={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={() => setOpen(true)}
                          disabled={totpConfirmed}
                        >
                          {totpConfirmed ? 'Done' : 'Setup'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mb={5}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid
                        container
                        item
                        alignItems="center"
                        justify="flex-start"
                        xs={8}
                      >
                        <Grid item>
                          <img
                            src={keyImg}
                            className={classes.logoImg}
                            alt="key"
                          />
                        </Grid>
                        <Grid item>
                          <b>Password</b>
                        </Grid>
                      </Grid>
                      <Grid container item justify="flex-end" xs={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            history.push('/security/change-password')
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
                      <Button disabled>SGD</Button>
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
              p={2}
              border={1}
              borderColor="grey.300"
              component="button"
              onClick={() => history.push('/security/setup-2fa')}
            >
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <img src={gAuthImg} className={classes.btnImg} alt="gAuth" />
                </Grid>
                <Grid item>
                  <b className={classes.btnLabel}>Google Authenticator</b>
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
