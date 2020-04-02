import React, { useState, useEffect } from 'react'
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Box,
  Card,
  Fade
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
// import classnames from 'classnames'

// styles
import useStyles from './styles'

// import google from '../../images/google.svg'
import VerifySignup from './VerifySignup'

// context
import {
  useUserDispatch,
  useUserState,
  setActiveTabId,
  loginUser,
  signupUser
  // verifySignup,
  // checkAuth
} from '../../context/UserContext'

function Login (props) {
  const classes = useStyles()
  // global
  const userDispatch = useUserDispatch()
  const userState = useUserState()
  // local
  const [isLoading, setIsLoading] = useState(false)
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const VerifyEmail = () => {
    return (
      <Grid container justify='center' alignItems='center'>
        <Box p={4}>
          <Grid item>
            <Box mb={2}>
              Thank you. Please check your email for a verification link.
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => setActiveTabId(userDispatch, 0)}
            >
              Back to Login
            </Button>
          </Grid>
        </Box>
      </Grid>
    )
  }

  const { token } = props.match.params || null
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        {token ? (
          <VerifySignup token={token} props={props} />
        ) : userState.activeTabId === 2 ? (
          <VerifyEmail />
        ) : (
          <form className={classes.form}>
            <Tabs
              value={userState.activeTabId}
              onChange={(e, id) => setActiveTabId(userDispatch, id)}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Login' classes={{ root: classes.tab }} />
              <Tab label='New User' classes={{ root: classes.tab }} />
            </Tabs>
            {userState.activeTabId === 0 && (
              <Box mt={3}>
                {/* <Typography variant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography> */}

                {/* <Button size='large' className={classes.googleButton}>
                  <img
                    src={google}
                    alt='google'
                    className={classes.googleIcon}
                  />
                  &nbsp;Sign in with Google
                </Button> */}
                {/* <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>
                    or
                  </Typography>
                  <div className={classes.formDivider} />
                </div> */}
                <Fade in={userState.error !== ''}>
                  <Typography
                    color='secondary'
                    className={classes.errorMessage}
                  >
                    {userState.error}
                  </Typography>
                </Fade>
                <Fade in={userState.message !== ''}>
                  <Typography
                    color='secondary'
                    className={classes.errorMessage}
                  >
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
                  value={usernameValue}
                  onChange={e => setUsernameValue(e.target.value)}
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
                  onChange={e => setPasswordValue(e.target.value)}
                  margin='normal'
                  placeholder='Password'
                  type='password'
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {userState.isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={
                        usernameValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          usernameValue,
                          passwordValue,
                          props.history
                        )
                      }
                      variant='contained'
                      color='primary'
                      size='large'
                    >
                      Login
                    </Button>
                  )}
                  <Button
                    color='primary'
                    size='large'
                    className={classes.forgetButton}
                  >
                    Forgot Password?
                  </Button>
                </div>
              </Box>
            )}
            {userState.activeTabId === 1 && (
              <>
                <Typography variant='h4' className={classes.greeting}>
                  Create Account
                </Typography>
                <Fade in={userState.error !== ''}>
                  <Typography
                    color='secondary'
                    className={classes.errorMessage}
                  >
                    {userState.error}
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
                  value={usernameValue}
                  onChange={e => setUsernameValue(e.target.value)}
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
                  onChange={e => setPasswordValue(e.target.value)}
                  margin='normal'
                  placeholder='Password'
                  type='password'
                  fullWidth
                />
                <div className={classes.creatingButtonContainer}>
                  {userState.isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      onClick={() =>
                        signupUser(userDispatch, usernameValue, passwordValue)
                      }
                      disabled={
                        usernameValue.length === 0 || passwordValue.length === 0
                      }
                      size='large'
                      variant='contained'
                      color='primary'
                      fullWidth
                      // className={classes.createAccountButton}
                    >
                      CREATE
                    </Button>
                  )}
                </div>
                {/* <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>
                    or
                  </Typography>
                  <div className={classes.formDivider} />
                </div> */}
                {/* <Button
                  size='large'
                  className={classnames(
                    classes.googleButton,
                    classes.googleButtonCreating
                  )}
                >
                  <img
                    src={google}
                    alt='google'
                    className={classes.googleIcon}
                  />
                  &nbsp;Sign in with Google
                </Button> */}
              </>
            )}
            <Box mt={3} align='right'>
              <a align='right' href='https://bitwarden.com'>
                <img src='https://www.vectorlogo.zone/logos/bitwarden/bitwarden-ar21.svg' />
              </a>
            </Box>
          </form>
        )}
        <Typography color='primary' className={classes.copyright}>
          © 2020 InvestaX, All rights reserved.
        </Typography>
      </div>
    </Grid>
  )
}

export default withRouter(Login)
