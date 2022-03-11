import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { VSpacer } from 'components/VSpacer'

export const NoMarketInfo = () => {
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <VSpacer size={'small'} />
      <Grid item>
        <Typography variant={'subtitle2'}>
          You haven’t made any investments yet. Let’s make the first investment.
        </Typography>
      </Grid>
      <VSpacer size={'small'} />
      <VSpacer size={'extraSmall'} />
      <Grid item>
        <Button
          component={AppRouterLinkComponent}
          to={InvestRoute.landing}
          variant='contained'
          color='primary'
          disableElevation
        >
          primary market
        </Button>
      </Grid>
      <VSpacer size={'medium'} />
    </Grid>
  )
}
