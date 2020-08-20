/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CircularProgress,
  Typography,
  Grid,
  Box,
  Button
} from '@material-ui/core'
import useQuery from 'hooks/useQuery'

import { postRequest } from 'services/httpRequests'

// styles
import useStyles from '../../styles'

const initialState = {
  error: null,
  isVerified: false,
  isLoading: true
}

// TODO: Convert to Context later
const Confirm = () => {
  const classes = useStyles()
  const history = useHistory()
  const query = useQuery()
  const token = query.get('token')
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const confirmSignup = async () => {
      try {
        const uri = '/auth/registrations/confirm'
        const result = await postRequest(uri, { verificationToken: token })
        if (result.status === 200) {
          setState({ ...state, isVerified: true, isLoading: false })
        } else {
          setState({
            ...state,
            isVerified: false,
            isLoading: false,
            error:
              'The token has already been verified, has expired, or is invalid.'
          })
        }
      } catch (err) {
        setState({
          ...state,
          isVerified: false,
          isLoading: false,
          error: 'Something went wrong. Please try again.'
        })
      }
    }

    confirmSignup()
  }, [])

  return (
    <Grid container className={classes.container}>
      <Grid container justify='center' alignItems='center'>
        {state.isLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Box mt={4}>
            <Typography>
              {state.error
                ? state.error
                : 'Successfully verfied. Please Login in, again.'}
            </Typography>
            <Box mt={4}>
              <Button
                variant='outlined'
                onClick={() => history.push('/auth/Login')}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default Confirm
