import React from 'react';
import { Grid, Typography, Button, Tabs, Tab, Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// styles
import useStyles from './styles';

import VerifySignup from './VerifySignup';
import ResetPassword from './ResetPassword';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

// context
import {
  useUserDispatch,
  useUserState,
  setActiveTabId,
} from '../../context/UserContext';
import { IdentityProvider } from '../../context/IdentityContext';

const RegistrationSuccess = () => {
  const userDispatch = useUserDispatch();

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
};

function Login(props) {
  const classes = useStyles();
  // global
  const userDispatch = useUserDispatch();
  const userState = useUserState();

  const { token } = props.match.params || null;

  return (
    <Grid container className={classes.container}>
      {token && token === 'reset-password' ? (
        <IdentityProvider>
          <ResetPassword />
        </IdentityProvider>
      ) : token && token !== 'reset-password' ? (
        <VerifySignup />
      ) : userState.activeTabId === 2 ? (
        <RegistrationSuccess />
      ) : (
        <form className={classes.form}>
          <Tabs
            value={userState.activeTabId}
            onChange={(e, id) => setActiveTabId(userDispatch, id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Sign in" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {userState.activeTabId === 0 && <LoginForm />}
          {userState.activeTabId === 1 && <SignupForm />}
        </form>
      )}
      <Typography color="primary" className={classes.copyright}>
        © 2020 InvestaX, All rights reserved.
      </Typography>
    </Grid>
  );
}

export default withRouter(Login);
