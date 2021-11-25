import React from 'react'
import { Grid, Button, Typography, useTheme, Hidden } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { VSpacer } from 'components/VSpacer'
import { DSOTable } from 'app/pages/invest/components/DSOTable/DSOTable'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import { VirtualAccountBalance } from 'app/pages/invest/components/VirtualAccountBalance/VirtualAccountBalance'

export const InvestLanding = () => {
  const theme = useTheme()

  return (
    <>
      <Grid container justify='space-between' spacing={4}>
        <Grid item xs={12}>
          <VirtualAccountBalance />
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
      <VSpacer size='medium' />
      <PromotedDSOs />
      <Hidden mdDown>
        <VSpacer size='medium' />
      </Hidden>

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
