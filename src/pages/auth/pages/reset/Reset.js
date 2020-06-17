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

  // State for the RESET FORM fields
  const [form, setFields] = useState({
    email: '',
    resetToken: '',
    newPassword: '',
  });

  const passwordResetDispatch = usePasswordResetDispatch();
  const passwordResetState = usePasswordResetState();

  // Handle change/update for the fields
  const updateField = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFields({
      ...form,
      [name]: value,
    });
  };

  // Reset fields for the for the RESET PASSWORD FORM
  const handleBeginResetSubmit = () => {
    setFields(form);
    if (form.email) beginResetPassword(passwordResetDispatch, form.email);
  };

  // Handle submit complete RESET PASSWORD FORM
  /**
   * TODO: Handling of errors for the RESET PASSWORD FORM
   */
  const handleCompleteResetSubmit = () => {
    if ((form.email, form.resetToken, form.newPassword))
      completeResetPassword(
        passwordResetDispatch,
        form.email,
        form.resetToken,
        form.newPassword
      );
  };

  const fields = [
    {
      id: 'email',
      name: 'email',
      value: form.email,
      onChange: updateField,
      margin: 'normal',
      placeholder: 'Email Address...',
      type: 'email',
    },
    {
      id: 'token',
      name: 'resetToken',
      value: form.resetToken,
      onChange: updateField,
      margin: 'normal',
      placeholder: 'Paste Reset Token...',
      type: 'text',
    },
    {
      id: 'new-password',
      name: 'newPassword',
      value: form.newPassword,
      onChange: updateField,
      margin: 'normal',
      placeholder: 'New Password...',
      type: 'password',
    },
  ];

  /**
   * TODO: Refactor condition rendering of the forms
   */
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
                {fields.map(field => 
                  <TextField
                    key={field.id}
                    id={field.id}
                    value={field.value}
                    onChange={field.onChange}
                    margin={field.margin}
                    placeholder={field.placeholder}
                    type={field.type}
                    name={field.name}
                    fullWidth
                  />
                )}
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
                      id={fields[0].id}
                      value={fields[0].valuee}
                      onChange={fields[0].onChange}
                      margin={fields[0].margin}
                      placeholder={fields[0].placeholder}
                      type={fields[0].type}
                      name={fields[0].name}
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
