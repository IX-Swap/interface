import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { Grid, Button, Typography } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { VSpacer } from 'components/VSpacer'
import { DSOTable } from 'app/pages/invest/components/DSOTable/DSOTable'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const InvestLanding = () => {
  const { user } = useAuth()

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
          >
            View my commitments
          </Button>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <PromotedDSOs />
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
