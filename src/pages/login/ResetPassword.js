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
    <Grid container>
      {identityState?.status === 'GETTING' ? (
        <CircularProgress />
      ) : identityState?.resetStatus ? (
        <Grid>
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
            <Button variant='outlined' type='submit'>
              Complete Reset
            </Button>
          </form>
        </Grid>
      ) : identityState?.resetComplete === 'request' ? (
        <CircularProgress />
      ) : identityState?.resetComplete !== 'success' ? (
        <form onSubmit={handleBeginResetSubmit}>
          <Box p={4}>
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
              <Button variant='outlined' type='submit'>
                Request Reset
              </Button>
            </Grid>
          </Box>
        </form>
      ) : (
        <Grid container>
          <Typography>{identityState?.passwordResetMessage}</Typography>
          <Box mt={4}>
            <Button
              variant='outlined'
              onClick={() => props.history.push('/login')}
            >
              Login
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default withRouter(ResetPassword)
