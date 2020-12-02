import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { Grid, Button, Typography } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOTopOffers } from 'app/components/DSO/components/DSOTopOffers'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useInvestListRouter } from 'app/pages/invest/routers/investLandingRouter'
import { VSpacer } from 'components/VSpacer'

export const OfferingsList = () => {
  const { user } = useAuth()
  const { paths } = useInvestListRouter()

  useSetPageTitle(`Welcome, ${user?.name ?? ''}`)

  return (
    <>
      <VSpacer size='small' />
      <Grid container justify='space-between'>
        <Typography variant='h4'>Top Offers</Typography>
        <Button
          component={AppRouterLinkComponent}
          to={paths.commitments}
          color='primary'
          variant='outlined'
          size='large'
          disableElevation
        >
          View my commitments
        </Button>
      </Grid>
      <VSpacer size='small' />
      <DSOTopOffers />
    </>
  )
}
