import React from 'react';
import { Box, Button, Grid, Typography, Tabs, Tab } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// styles
import useStyles from '../../styles';

import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

// context
import {
  useUserState,
  useUserDispatch,
  setActiveTabId,
} from '../../../../context/UserContext';

function SignIn() {
  const classes = useStyles();
  // global
  const userDispatch = useUserDispatch();
  const userState = useUserState();

  if (userState.activeTabId === 2)
    return (
      <Grid container justify="center" alignItems="center">
        <Box p={4}>
          <Grid item>
            <Box mb={2}>
              Thank you. Please check your email for a verification link.
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setActiveTabId(userDispatch, 0)}
            >
              Back to Login
            </Button>
          </Grid>
        </Box>
      </Grid>
    );

  return (
    <Grid container className={classes.container}>
      <form className={classes.form}>
        <Tabs
          value={userState.activeTabId}
          onChange={(e, id) => setActiveTabId(userDispatch, id)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" classes={{ root: classes.tab }} />
          <Tab label="New User" classes={{ root: classes.tab }} />
        </Tabs>
        {userState.activeTabId === 0 && <LoginForm />}
        {userState.activeTabId === 1 && <SignupForm />}
      </form>
      <Typography color="primary" className={classes.copyright}>
        © 2020 InvestaX, All rights reserved.
      </Typography>
    </Grid>
  );
}

export default withRouter(SignIn);
