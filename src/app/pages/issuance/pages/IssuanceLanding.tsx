import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { InvestmentGrowthChart } from 'app/pages/issuance/components/InvestmentGrowthChart'
import { CommitmentStatsChart } from 'app/pages/issuance/components/CommitmentStatsChart'
import { DSOInfo } from 'app/pages/issuance/components/DSOInfo'
import { CountdownTimer } from 'app/pages/issuance/components/CountdownTimer/CountdownTimer'
import { MoreOptions } from 'app/pages/issuance/components/MoreOptions'
import { RegionalMap } from 'app/pages/issuance/components/IssuanceLanding/RegionalMap'
import { Activities } from 'app/pages/issuance/components/IssuanceLanding/Activities'
import { TopInvestors } from 'app/pages/issuance/components/IssuanceLanding/TopInvestors'
import { TotalInvestors } from 'app/pages/issuance/components/IssuanceLanding/TotalInvestors'
import { DSOFilter } from 'app/pages/issuance/components/IssuanceLanding/DSOFilter'
import { AmountRaised } from 'app/pages/issuance/components/IssuanceLanding/AmountRaised'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { IssuanceLandingCard } from 'ui/SecondaryCard'

export const IssuanceLanding = () => {
  const {
    params: { dsoId, issuerId }
  } = useIssuanceRouter()
  const { data } = useDSOById(dsoId, issuerId)
  const { theme, isTablet } = useAppBreakpoints()

  useSetPageTitle(data?.tokenName ?? 'Issuance')

  const divider = (
    <Hidden mdUp>
      <Grid item xs={12}>
        <VSpacer size='small' />
      </Grid>
    </Hidden>
  )

  return (
    <>
      <Grid
        container
        justify='space-between'
        wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
      >
        <Grid
          item
          container
          direction='row'
          spacing={isTablet ? 0 : 3}
          style={{ marginBottom: theme.spacing(1.5) }}
          xs={12}
          md={8}
        >
          <Grid item xs={12} md={4} lg={4}>
            <IssuanceLandingCard variant='outlined'>
              <TotalInvestors />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <AmountRaised />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <TargetFundraise />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} lg={8}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <InvestmentGrowthChart />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} lg={4}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <TopInvestors />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} lg={6}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <CommitmentStatsChart />
            </IssuanceLandingCard>
          </Grid>

          {divider}

          <Grid item xs={12} lg={6}>
            <IssuanceLandingCard variant='outlined' style={{ height: '100%' }}>
              <RegionalMap />
            </IssuanceLandingCard>
          </Grid>
        </Grid>

        {divider}

        <Grid
          container
          item
          xs={12}
          md={4}
          style={{ marginBottom: isTablet ? 0 : theme.spacing(3) }}
        >
          <Grid
            component={IssuanceLandingCard}
            container
            item
            xs={12}
            direction='column'
            justify={isValidDSOId(dsoId) ? 'flex-start' : 'center'}
            variant='outlined'
            style={{ padding: theme.spacing(4) }}
          >
            <DSOInfo />
            <CountdownTimer />
            <DSOFilter />
            <MoreOptions />
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
          <IssuanceLandingCard variant='outlined'>
            <Activities />
          </IssuanceLandingCard>
        </Grid>
      </Grid>
    </>
  )
}
