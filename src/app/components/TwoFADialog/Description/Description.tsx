import React from 'react'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/TwoFADialog/Description/Description.styles'

export const getDescription = (enable2fa: boolean | undefined) => {
  if (enable2fa === true) {
    return 'Your account is secured with Two Factor Authentication (2FA)'
  }
  return 'Your account is currently at risk as Two Factor Authentication (2FA) is not enabled now. We urge you to activate this feature as soon as possible.'
}

export interface DescriptionProps {
  enable2Fa: boolean | undefined
}

export const Description = ({ enable2Fa }: DescriptionProps) => {
  const classes = useStyles({ enable2Fa: enable2Fa })

  return (
    <Typography variant='body1' className={classes.description}>
      {getDescription(enable2Fa)}
    </Typography>
  )
}
