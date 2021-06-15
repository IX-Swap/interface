import React from 'react'
import { Grid, Button, Typography, useTheme } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { VSpacer } from 'components/VSpacer'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'
import { SecondaryMarketTable } from 'app/pages/invest/components/SecondaryMarketTable/SecondaryMarketTable'

export const InvestOverview = () => {
  const theme = useTheme()

  return (
    <>
      <Grid container justify='space-between'>
        <Grid item container justify={'flex-end'}>
          <Button
            component={AppRouterLinkComponent}
            to={InvestRoute.commitments}
            color='primary'
            variant='outlined'
            size='large'
            disableElevation
            style={{ color: theme.palette.primary.main }}
          >
            My commitments
          </Button>
        </Grid>
        <PromoBanner />
        <VSpacer size='medium' />
      </Grid>
      <VSpacer size='small' />
      <PromotedDSOs />
      <VSpacer size='medium' />

      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h4'>Secondary Market</Typography>
        </Grid>
        <Grid item>
          <SecondaryMarketTable />
        </Grid>
      </Grid>
    </>
  )
}
