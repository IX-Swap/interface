import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { Grid, Button, Typography, useTheme } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { VSpacer } from 'components/VSpacer'
import { DSOTable } from 'app/pages/invest/components/DSOTable/DSOTable'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
// import { OTCMarket } from 'app/pages/invest/components/OTCMarkets'
import { PrimaryOfferings } from 'app/pages/invest/components/PrimaryOfferings'

export const InvestLanding = () => {
  const { user } = useAuth()
  const theme = useTheme()

  return (
    <>
      <Grid container justify='space-between'>
        <Grid item xs={12}>
          <PageHeader
            title={`Welcome, ${user?.name ?? 'Unknown'}`}
            showBreadcrumbs={false}
          />
        </Grid>
        <Grid item>
          <Typography variant='h4'>Top Offers</Typography>
        </Grid>
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            to={InvestRoute.commitments}
            color='primary'
            variant='outlined'
            size='large'
            disableElevation
            style={{ color: theme.palette.primary.main }}
          >
            View my commitments
          </Button>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <PrimaryOfferings />
      {/* <OTCMarket /> */}
      <VSpacer size='small' />
      <PromotedDSOs />
      <VSpacer size='medium' />
      {/* <OTCMarket /> */}
      <VSpacer size='medium' />
      <PromoBanner />
      <VSpacer size='medium' />
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h4'>More Offers for You</Typography>
        </Grid>
        <Grid item>
          <DSOTable />
        </Grid>
      </Grid>
    </>
  )
}
