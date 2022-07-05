import React from 'react'
import { useStyles } from 'app/pages/identity/pages/SuccessPage/SuccessPage.styles'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ReactComponent as Success } from 'assets/icons/alerts/success.svg'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { TwoFAAlert } from 'app/pages/identity/pages/SuccessPage/TwoFAAlert'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useAuth } from 'hooks/auth/useAuth'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const SuccessPage = () => {
  const classes = useStyles()
  const data = useAuth()
  const { isMobile } = useAppBreakpoints()
  const name = data.user?.name

  return (
    <Grid container>
      <Grid item xs={12} className={classes.pageHeader}>
        <PageHeader title={name} />
      </Grid>
      <RootContainer>
        <Box className={classes.boxAlert} mb={2} height={372}>
          <Grid className={classes.iconSuccess}>
            <Success height={isMobile ? 60 : 80} width={isMobile ? 60 : 80} />
          </Grid>
          <Grid className={classes.mainContent}>
            <Typography variant='h2' className={classes.topText}>
              Thank you for your application!
            </Typography>
            <Typography className={classes.text} mt={2}>
              We are checking your application now, this usually takes from one
              to three days
            </Typography>
            <Typography className={classes.text} mt={2}>
              If you have any further questions, you can always contact our{' '}
              <a href=' https://investax.io/contact/ '>support department</a>
            </Typography>
            <Button
              component={AppRouterLinkComponent}
              to={IdentityRoute.list}
              variant='outlined'
              size='large'
              replace={false}
              disableElevation
              className={classes.button}
            >
              View Identity
            </Button>
          </Grid>
        </Box>
        <TwoFAAlert />
      </RootContainer>
    </Grid>
  )
}
