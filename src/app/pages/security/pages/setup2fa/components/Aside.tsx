import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from 'app/pages/security/pages/setup2fa/Setup2fa.styles'
import { useSecurityRouter } from 'app/pages/security/router'

export const Aside = () => {
  const { paths } = useSecurityRouter()
  const { aside } = useStyles()

  return (
    <Box className={aside}>
      <Typography variant='h5'>What is 2FA?</Typography>
      <VSpacer size='medium' />
      <Typography variant='body1'>
        (2FA) Two-Factor Authentication Increase your account security by
        requiring multiple forms of verification when signining into InvestaX.
      </Typography>
      <VSpacer size='medium' />
      <AppRouterLink variant='body1' to={paths.guide}>
        Learn more
      </AppRouterLink>
    </Box>
  )
}
