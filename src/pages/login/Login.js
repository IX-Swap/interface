import React, { useState } from 'react'
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

// styles
import useStyles from './styles'

// logo
import logo from '../../images/ix-logo-v5.png'
import google from '../../images/google.svg'

// context
import {
  useUserDispatch,
  useUserState,
  setActiveTabId,
  loginUser,
  signupUser
} from '../../context/UserContext'

function Login (props) {
  const classes = useStyles()

  // global
  const userDispatch = useUserDispatch()
  const userState = useUserState()

  // local
  const [isLoading, setIsLoading] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt='logo' className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          Digital Securities
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
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
            <>
              {/* <Typography variant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography> */}

              <Button size='large' className={classes.googleButton}>
                <img src={google} alt='google' className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Fade in={userState.error !== ''}>
                <Typography color='secondary' className={classes.errorMessage}>
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
                placeholder='Email Adress'
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
                  <CircularProgress size={26} className={classes.loginLoader} />
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
                        props.history,
                        setIsLoading
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
                  Forget Password
                </Button>
              </div>
            </>
          )}
          {userState.activeTabId === 1 && (
            <>
              <Typography variant='h4' className={classes.greeting}>
                Create a new account
              </Typography>
              <Fade in={userState.error !== ''}>
                <Typography color='secondary' className={classes.errorMessage}>
                  {userState.error}
                </Typography>
              </Fade>
              <TextField
                id='name'
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField
                  }
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin='normal'
                placeholder='Full Name'
                type='email'
                fullWidth
              />
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
                placeholder='Email Adress'
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
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      signupUser(
                        userDispatch,
                        nameValue,
                        usernameValue,
                        passwordValue
                      )
                    }
                    disabled={
                      usernameValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size='large'
                    variant='contained'
                    color='primary'
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size='large'
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating
                )}
              >
                <img src={google} alt='google' className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </>
          )}
        </div>
        <Typography color='primary' className={classes.copyright}>
          © 2020 InvestX, All rights reserved.
        </Typography>
      </div>
    </Grid>
  )
}

export default withRouter(Login)
