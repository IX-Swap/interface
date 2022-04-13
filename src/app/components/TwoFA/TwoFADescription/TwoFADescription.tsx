import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/TwoFA/TwoFADescription/TwoFADescription.styles'

export const getDescription = (enable2fa: boolean | undefined) => {
  switch (enable2fa) {
    case true:
      return 'Your account is secured with Two Factor Authentication (2FA)'
    default:
      return 'Your account is currently at risk as Two Factor Authentication (2FA) is not enabled now. We urge you to activate this feature as soon as possible.'
  }
}

export const TwoFADescription = () => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user
  const classes = useStyles({ enable2Fa: enable2Fa })

  return (
    <Typography variant='body1' className={classes.description}>
      {getDescription(enable2Fa)}
    </Typography>
  )
}
