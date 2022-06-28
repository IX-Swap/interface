import React from 'react'
import { Grid, Button, Typography, useTheme, Box } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { VSpacer } from 'components/VSpacer'
import { PromoBanner } from 'app/pages/invest/components/PromoBanner'
import { SecondaryMarketTable } from 'app/pages/invest/components/SecondaryMarketTable/SecondaryMarketTable'
import { OverviewPageFilters } from 'app/pages/invest/components/OverviwPageFilters'
import { PrimaryOfferings } from 'app/pages/invest/components/PrimaryOfferings'
import { OTCMarket } from 'app/pages/invest/components/OTCMarkets'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const InvestOverview = () => {
  const theme = useTheme()
  const { isMobile } = useAppBreakpoints()

  return (
    <>
      <Grid container justifyContent='space-between'>
        <Grid item container justifyContent={'flex-end'}>
          <Grid item xs={12} sm={'auto'}>
            <OverviewPageFilters />
          </Grid>
          <Grid item xs={12} sm={'auto'} order={isMobile ? -1 : 'initial'}>
            <Box pl={{ sm: 2 }} pb={2}>
              <Button
                component={AppRouterLinkComponent}
                to={InvestRoute.commitments}
                color='primary'
                variant='outlined'
                size='large'
                disableElevation
                style={{ color: theme.palette.primary.main }}
              >
                My investments
              </Button>
            </Box>
          </Grid>
        </Grid>
        <PromoBanner />
        <VSpacer size='medium' />
      </Grid>

      <VSpacer size='medium' />

      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h4'>Primary Offerings</Typography>
        </Grid>
        <Grid item>
          <PrimaryOfferings />
        </Grid>
      </Grid>

      <VSpacer size='large' />

      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h4'>OTC Market</Typography>
        </Grid>
        <Grid item>
          <OTCMarket />
        </Grid>
      </Grid>

      <VSpacer size='large' />

      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h4'>Secondary Market</Typography>
        </Grid>
        <Grid item style={{ maxWidth: '100%' }}>
          <SecondaryMarketTable />
        </Grid>
      </Grid>
    </>
  )
}
