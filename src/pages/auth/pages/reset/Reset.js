import React, { useState } from 'react';
import {
  Grid,
  Box,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import useStyles from '../../styles';

import {
  usePasswordResetDispatch,
  usePasswordResetState,
  beginResetPassword,
  completeResetPassword,
} from './PasswordResetContext';

function ResetPassword(props) {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [resetToken, setResetToken] = useState();
  const [newPassword, setNewPassword] = useState();
  const passwordResetDispatch = usePasswordResetDispatch();
  const passwordResetState = usePasswordResetState();

  const handleBeginResetSubmit = () => {
    setResetToken('');
    setNewPassword('');
    if (email) beginResetPassword(passwordResetDispatch, email);
  };

  const handleCompleteResetSubmit = () => {
    if ((email, resetToken, newPassword))
      completeResetPassword(
        passwordResetDispatch,
        email,
        resetToken,
        newPassword
      );
  };

  return (
    <Grid container className={classes.container}>
      <Grid container justify="center" alignItems="center">
        {passwordResetState?.status === 'GETTING' ? (
          <Grid item>
            <CircularProgress />
          </Grid>
        ) : passwordResetState?.resetStatus ? (
          <Grid item md={5} lg={5}>
            <Box p={3}>
              <form onSubmit={handleCompleteResetSubmit}>
                <Typography comonent="p">
                  {passwordResetState?.passwordResetMessage}
                </Typography>
                <TextField
                  id="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  placeholder="Email Address"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="token"
                  value={resetToken || ''}
                  onChange={(e) => setResetToken(e.target.value)}
                  margin="normal"
                  placeholder="Paste Reset Token"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="new-password"
                  value={newPassword || ''}
                  onChange={(e) => setNewPassword(e.target.value)}
                  margin="normal"
                  placeholder="New Password"
                  type="password"
                  fullWidth
                />
                <Box mt={4}>
                  <Button variant="outlined" type="submit">
                    Complete Reset
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        ) : passwordResetState?.resetComplete === 'request' ? (
          <Grid item>
            <CircularProgress />
          </Grid>
        ) : passwordResetState?.resetComplete !== 'success' ? (
          <Grid item xs={12} sm={8} md={3} lg={3}>
            <Box p={3}>
              <form onSubmit={handleBeginResetSubmit}>
                <Box>
                  <Typography comonent="p">
                    {passwordResetState?.passwordResetMessage}
                  </Typography>

                  <Grid>
                    <TextField
                      id="email"
                      value={email || ''}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      placeholder="Email Address"
                      type="email"
                      fullWidth
                    />
                    <Box mt={4}>
                      <Button variant="outlined" type="submit">
                        Request Reset
                      </Button>
                    </Box>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Grid>
        ) : (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <center>{passwordResetState?.passwordResetMessage}</center>
              <Box mt={4}>
                <Button
                  variant="outlined"
                  onClick={() => props.history.push('/auth/sign-in')}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default withRouter(ResetPassword);
