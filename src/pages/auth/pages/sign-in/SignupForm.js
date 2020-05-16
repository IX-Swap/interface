import React, { useState } from 'react';
import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from '@material-ui/core';

// context
import { useUserDispatch, useUserState } from 'context/user';
import { signupUser } from 'context/user/actions';

// styles
import useStyles from '../../styles';

const SignupForm = () => {
  const classes = useStyles();
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <>
      <Typography variant="h4" className={classes.greeting}>
        Create Account
      </Typography>
      <Fade in={userState.error !== ''}>
        <Typography color="secondary" className={classes.errorMessage}>
          {userState.error}
        </Typography>
      </Fade>
      <TextField
        id="name"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        margin="normal"
        placeholder="Name"
        type="text"
        fullWidth
      />
      <TextField
        id="email"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        margin="normal"
        placeholder="Email Address"
        type="email"
        fullWidth
      />
      <TextField
        id="password"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
      />
      <div className={classes.creatingButtonContainer}>
        {userState.isLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            onClick={() =>
              signupUser(userDispatch, {
                email: emailValue,
                password: passwordValue,
                name: nameValue,
              })
            }
            disabled={
              emailValue.length === 0 ||
              passwordValue.length === 0 ||
              nameValue.length === 0
            }
            size="large"
            variant="contained"
            color="primary"
            fullWidth
          >
            CREATE
          </Button>
        )}
      </div>
    </>
  );
};

export default SignupForm;
