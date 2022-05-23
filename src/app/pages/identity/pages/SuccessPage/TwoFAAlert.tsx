import React from 'react'
import { useStyles } from 'app/pages/identity/pages/SuccessPage/SuccessPage.styles'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useAuth } from 'hooks/auth/useAuth'
import { ReactComponent as Enabled } from 'assets/icons/2fa/security-enabled.svg'
import { ReactComponent as Disabled } from 'assets/icons/2fa/security-disabled.svg'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { SecurityRoute } from 'app/pages/security/router/config'

export const TwoFAAlert = () => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user
  const isProtected = enable2Fa !== undefined && enable2Fa
  return (
    <Box>
      {isProtected ? (
        <Box
          className={classes.boxAlert}
          height={isMobile ? 300 : 284}
          mb={isMobile ? 2 : 10}
        >
          <Grid className={classes.icon2fa}>
            <Enabled
              height={isMobile ? 73 : 100}
              width={isMobile ? 60 : 81.82}
            />
          </Grid>
          <Grid className={classes.mainContent}>
            <Typography variant='h2' className={classes.topText}>
              Account Protected
            </Typography>
            <Typography className={classes.text} mt={2}>
              Your account is now protected by Two-Factor Authentication
            </Typography>
            <Button
              className={classes.button}
              variant='outlined'
              size='large'
              to={SecurityRoute.change2fa}
              component={AppRouterLinkComponent}
            >
              Update 2FA
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box className={classes.boxAlert} height={326} mb={isMobile ? 2 : 10}>
          <Grid className={classes.icon2fa}>
            <Disabled
              height={isMobile ? 73 : 100}
              width={isMobile ? 60 : 81.82}
            />
          </Grid>
          <Grid className={classes.mainContent}>
            <Typography variant='h2' className={classes.topText}>
              Protect your account!
            </Typography>
            <Typography className={classes.text} mt={2} color='#F56283'>
              Your account is currently at risk as Two Factor Authentication
              (2FA) is not enabled now. We urge you to activate this feature as
              soon as posible.
            </Typography>
            <Button
              className={classes.button}
              to={SecurityRoute.setup2fa}
              component={AppRouterLinkComponent}
              variant='contained'
              size='large'
            >
              Enable 2FA
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
