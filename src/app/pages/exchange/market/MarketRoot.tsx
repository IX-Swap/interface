import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { Box, Grid } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { MyOrders } from 'app/pages/exchange/market/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/exchange/market/components/FinancialSummary/FinancialSummary'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'

export const MarketRoot = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <RootContainer
      maxWidth={false}
      style={{ backgroundColor: 'rgb(249, 259, 249)' }}
    >
      <Grid container direction={'column'}>
        <Grid item container>
          <Grid item xs={12} style={{ backgroundColor: '#fff' }}>
            <FinancialSummary />
          </Grid>
        </Grid>
        <Box my={1} />
        <Grid
          item
          container
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
        >
          <Grid item container xs={12} md={3}>
            <Grid style={{ backgroundColor: '#fff' }} xs={12}>
              <MarketRoot />
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6} direction={'row'} spacing={2}>
            <Grid item container xs={12}>
              <Grid item style={{ backgroundColor: '#fff' }} xs={12}>
                <TVChartContainer />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item style={{ backgroundColor: '#fff' }} xs={12}>
                <MyOrders />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3}></Grid>
        </Grid>
      </Grid>
    </RootContainer>
  )
}
