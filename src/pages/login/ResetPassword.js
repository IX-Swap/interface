import React, { useState } from 'react'
import {
  Grid,
  Box,
  CircularProgress,
  TextField,
  Button,
  Typography
} from '@material-ui/core'

import { withRouter } from 'react-router-dom'

import {
  useIdentityState,
  useIdentityDispatch,
  beginResetPassword,
  completeResetPassword
} from 'context/IdentityContext'

function ResetPassword (props) {
  const [email, setEmail] = useState()
  const [resetToken, setResetToken] = useState()
  const [newPassword, setNewPassword] = useState()
  const identityDispatch = useIdentityDispatch()
  const identityState = useIdentityState()

  const handleBeginResetSubmit = () => {
    setResetToken('')
    setNewPassword('')
    if (email) beginResetPassword(identityDispatch, email)
  }

  const handleCompleteResetSubmit = () => {
    if ((email, resetToken, newPassword))
      completeResetPassword(identityDispatch, email, resetToken, newPassword)
  }

  return (
    <Grid container justify='center' alignItems='center'>
      {identityState?.status === 'GETTING' ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : identityState?.resetStatus ? (
        <Grid item md={5} lg={5}>
          <Box p={3}>
            <form onSubmit={handleCompleteResetSubmit}>
              <Typography comonent='p'>
                {identityState?.passwordResetMessage}
              </Typography>
              <TextField
                id='email'
                value={email || ''}
                onChange={e => setEmail(e.target.value)}
                margin='normal'
                placeholder='Email Address'
                type='email'
                fullWidth
              />
              <TextField
                id='token'
                value={resetToken || ''}
                onChange={e => setResetToken(e.target.value)}
                margin='normal'
                placeholder='Paste Reset Token'
                type='text'
                fullWidth
              />
              <TextField
                id='new-password'
                value={newPassword || ''}
                onChange={e => setNewPassword(e.target.value)}
                margin='normal'
                placeholder='New Password'
                type='password'
                fullWidth
              />
              <Box mt={4}>
                <Button variant='outlined' type='submit'>
                  Complete Reset
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      ) : identityState?.resetComplete === 'request' ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : identityState?.resetComplete !== 'success' ? (
        <Grid item xs={12} sm={8} md={5} lg={5}>
          <Box p={3}>
            <form onSubmit={handleBeginResetSubmit}>
              <Box>
                <Typography comonent='p'>
                  {identityState?.passwordResetMessage}
                </Typography>

                <Grid>
                  <TextField
                    id='email'
                    value={email || ''}
                    onChange={e => setEmail(e.target.value)}
                    margin='normal'
                    placeholder='Email Address'
                    type='email'
                    fullWidth
                  />
                  <Box mt={4}>
                    <Button variant='outlined' type='submit'>
                      Request Reset
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      ) : (
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <center>{identityState?.passwordResetMessage}</center>
            <Box mt={4}>
              <Button
                variant='outlined'
                onClick={() => props.history.push('/login')}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default withRouter(ResetPassword)
