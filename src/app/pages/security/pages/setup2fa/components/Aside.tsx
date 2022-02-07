import React from 'react'
import { Box, Typography } from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from 'app/pages/security/pages/setup2fa/Setup2fa.styles'
import { SecurityRoute } from 'app/pages/security/router/config'

export const Aside = () => {
  const { aside } = useStyles()

  return (
    <Box className={aside}>
      <Typography variant='h5'>What is 2FA?</Typography>
      <VSpacer size='medium' />
      <Typography variant='body1'>
        (2FA) Two-Factor Authentication increases your account security by
        requiring multiple forms of verification when signing into InvestaX
        Prime.
      </Typography>
      <VSpacer size='medium' />
      <AppRouterLink variant='body1' to={SecurityRoute.guide}>
        Learn more
      </AppRouterLink>
    </Box>
  )
}
