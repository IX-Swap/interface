import React, { useState } from 'react'
import {
  Grid,
  Box,
  CircularProgress,
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
  const userDispatch = useUserDispatch()
  const userState = useUserState()
  const handleSubmit = () => {
    verifySignup(userDispatch, props.token)
  }

  return (
    <Grid container justify='center'>
      {userState?.isVerified ? (
        props.history.push('/login')
      ) : userState?.isLoading ? (
        <RenderSpinner />
      ) : (
        <Grid container justify='center' alignItems='center'>
          <form>
            <Box m={5} p={5}>
              <Typography component='h3'>
                Please click the button below to verify signup.
              </Typography>
              <Box m={4}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleSubmit()}
                >
                  Verify Sign Up
                </Button>
              </Box>

              <Box m={2}>{useState.error}</Box>
            </Box>
          </form>
        </Grid>
      )}
    </Grid>
  )
}

const RenderSpinner = () => (
  <Box m={3} display='flex'>
    <CircularProgress />
  </Box>
)

export default withRouter(VerifySignup)
