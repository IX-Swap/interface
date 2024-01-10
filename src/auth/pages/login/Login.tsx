import React from 'react'
import { Grid, Typography, Box, Divider } from '@mui/material'
import { Submit } from 'components/form/Submit'
import { LoginFields } from 'auth/pages/login/components/LoginFields'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useStyles } from './Login.styles'
import { VSpacer } from 'components/VSpacer'
import { MAX_LOGIN_ATTEMPTS } from 'types/auth'
import { useTenant } from 'auth/hooks/useTenant'

export interface LoginProps {
  hidden: boolean
  isLoading: boolean
  attempts?: number
}

export const Login = ({ hidden, isLoading, attempts = 0 }: LoginProps) => {
  useTenant()
  const { title, link, text } = useStyles()

  return (
    <Box display={hidden ? 'none' : 'block'}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography className={title} variant={'h3'} align='center'>
            Sign In
          </Typography>
          <VSpacer size={'extraMedium'} />
        </Grid>
        <Grid item>
          <LoginFields />
        </Grid>
        {attempts >= MAX_LOGIN_ATTEMPTS && (
          <Grid item>
            <Typography variant='body2' color='error'>
              You have {attempts <= 5 ? 5 - attempts : 0} attempts left. Your
              account will be temporarily locked.
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
            Connect Wallet
          </Submit>
        </Grid>
        <Grid item>
          <VSpacer size={'small'} />
          <Divider />
        </Grid>
        <Grid item>
          <Typography align='center' className={text}>
            Don’t have an account?{' '}
            <AppRouterLink to={AuthRoute.signup} className={link}>
              Create an Account.
            </AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
