import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { LoginFields } from 'auth/pages/login/components/LoginFields'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router'

export interface LoginProps {
  hidden: boolean
  isLoading: boolean
}

export const Login = ({ hidden, isLoading }: LoginProps) => {
  return (
    <Box display={hidden ? 'none' : 'block'}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography align='center'>Log In with your account</Typography>
        </Grid>
        <Grid item>
          <LoginFields />
        </Grid>
        <Grid item container justify='center'>
          <Submit
            style={{ width: 150 }}
            size='large'
            variant='contained'
            color='primary'
            watchIsDirty={false}
            disabled={isLoading}
          >
            Login
          </Submit>
        </Grid>
        <Grid item>
          <Typography align='center'>
            Don’t have any account?{' '}
            <AppRouterLink to={AuthRoute.signup}>
              Create an Account.
            </AppRouterLink>
          </Typography>
        </Grid>
        <Grid item>
          <Typography align='center'>
            <AppRouterLink to={AuthRoute.passwordReset}>
              Forgot Password?
            </AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
