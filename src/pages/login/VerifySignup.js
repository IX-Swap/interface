import React, { useState } from 'react'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  TextField,
  Button,
  Typography
} from '@material-ui/core'

import { withRouter } from 'react-router-dom'
import {
  useUserDispatch,
  useUserState,
  verifySignup
} from 'context/UserContext'

function VerifySignup (props) {
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()

  const userDispatch = useUserDispatch()
  const userState = useUserState()
  const handleSubmit = () => {
    verifySignup(userDispatch, props.token, { email, password })
  }

  return (
    <Grid container justify='center'>
      {userState?.isVerified ? (
        props.history.push('/login')
      ) : userState?.isLoading ? (
        <RenderSpinner />
      ) : (
        <RenderForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={userState.error}
          props={props}
        />
      )}
    </Grid>
  )
}

const RenderSpinner = () => (
  <Box m={3} display='flex'>
    <CircularProgress />
  </Box>
)

const RenderForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  error,
  props
}) => (
  <Grid item xs={12} sm={12}>
    <Paper component='form'>
      <Box m={5} p={5}>
        <Typography component='h3'>
          Please re-enter your login credentials to verify your email address.
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
          id='password'
          value={password || ''}
          onChange={e => setPassword(e.target.value)}
          margin='normal'
          placeholder='Password'
          type='password'
          fullWidth
        />
        <Box m={4}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleSubmit()}
          >
            Verify Sign Up
          </Button>
          <Button onClick={() => props.history.push('/login')}>Back</Button>
        </Box>

        <Box m={2}>{error}</Box>
      </Box>
    </Paper>
  </Grid>
)

export default withRouter(VerifySignup)
