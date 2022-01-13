import React from 'react'
import { Grid, Typography, Box, Divider } from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { LoginFields } from 'auth/pages/login/components/LoginFields'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useStyles } from './Login.styles'
import { VSpacer } from 'components/VSpacer'

export interface LoginProps {
  hidden: boolean
  isLoading: boolean
  attempts?: number
}

export const Login = ({ hidden, isLoading, attempts = 0 }: LoginProps) => {
  const { title, link } = useStyles()

  return (
    <Box display={hidden ? 'none' : 'block'}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography className={title} variant={'h3'} align='center'>
            Sign In
          </Typography>
          <VSpacer size={'small'} />
        </Grid>
        <Grid item>
          <LoginFields />
        </Grid>
        {attempts >= 3 && (
          <Grid item>
            <Typography variant='body2' color='error'>
              You have {5 - attempts} attempts left. Your account will be
              temporarily locked.
            </Typography>
          </Grid>
        )}

        <Grid item container justifyContent='center'>
          <Submit
            fullWidth
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
          <VSpacer size={'small'} />
          <Divider />
        </Grid>
        <Grid item>
          <Typography align='center'>
            Don’t have an account?
            <AppRouterLink to={AuthRoute.signup} className={link}>
              Create an Account.
            </AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
