import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Box,
  Fade
} from '@material-ui/core'

import { useUserDispatch, useUserState } from 'context/user'
import { loginUser } from 'context/user/actions'

// styles
import useStyles from '../../styles'

// PasswordReset

const LoginForm = () => {
  const classes = useStyles()
  const history = useHistory()
  // global
  const userDispatch = useUserDispatch()
  const userState = useUserState()
  // local
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [otpValue, setOtpValue] = useState('')

  return (
    <Box mt={3}>
      <Fade in={userState.error !== ''}>
        <Typography color='secondary' className={classes.errorMessage}>
          {userState.error}
        </Typography>
      </Fade>
      <Fade in={userState.message !== ''}>
        <Typography color='secondary' className={classes.errorMessage}>
          {userState.message}
        </Typography>
      </Fade>
      <TextField
        id='email'
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField
          }
        }}
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        margin='normal'
        placeholder='Email Address'
        type='email'
        fullWidth
      />
      <TextField
        id='password'
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField
          }
        }}
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        margin='normal'
        placeholder='Password'
        type='password'
        fullWidth
      />
      <TextField
        id='otpValue'
        variant='outlined'
        value={otpValue}
        onChange={(e) => setOtpValue(e.target.value)}
        margin='normal'
        autoComplete='off'
        placeholder='OTP Code (optional)'
        type='otpValue'
        fullWidth
      />
      <div className={classes.formButtons}>
        {userState && !userState.isLoading ? (
          <Button
            disabled={emailValue.length === 0 || passwordValue.length === 0}
            onClick={() =>
              loginUser(userDispatch, {
                email: emailValue,
                password: passwordValue,
                otp: otpValue
              })}
            variant='contained'
            color='primary'
            size='large'
          >
            Login
          </Button>
        ) : (
          <CircularProgress size={26} className={classes.loginLoader} />
        )}
        <Button
          color='primary'
          size='large'
          className={classes.forgetButton}
          onClick={() => history.push('/Auth/reset')}
        >
          Forgot Password?
        </Button>
      </div>
    </Box>
  )
}

export default LoginForm
