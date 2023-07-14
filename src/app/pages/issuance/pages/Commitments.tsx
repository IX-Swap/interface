import React from 'react'
import { Card, Grid, Hidden } from '@mui/material'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { useParams } from 'react-router-dom'
import { TotalInvestors } from 'app/pages/issuance/components/CapTable/TotalInvestors'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { InvestorCommitmentTable } from 'app/pages/issuance/components/Commitments/InvestorCommitmentTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Activities } from '../components/IssuanceLanding/Activities'
import { IssuanceLandingCard } from 'ui/SecondaryCard'
import { InvestmentGrowthChart } from '../components/InvestmentGrowthChart'
import { CommitmentStatsChart } from '../components/CommitmentStatsChart'
import { RegionalMap } from '../components/IssuanceLanding/RegionalMap'
import { TopInvestors } from '../components/IssuanceLanding/TopInvestors'

export const Commitments = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading } = useDSOById(dsoId, issuerId)
  const { isTablet } = useAppBreakpoints()

  const divider = (
    <Hidden mdUp>
      <Grid item xs={12}>
        <VSpacer size='small' />
      </Grid>
    </Hidden>
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <Grid
        container
        justifyContent='space-between'
        wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
        mt={-4}
      >
        <Grid
          item
          container
          direction='row'
          spacing={0}
          xs={12}
          justifyContent={'space-between'}
        >
          <Grid item container spacing={2}>
            <Grid item xs={6} md={3}>
              <Card>
                <TotalInvestors isNewThemeOn />
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <AmountRaised isNewThemeOn />
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <TargetFundraise isNewThemeOn />
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CountdownTimer />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container direction='row' spacing={2} mt={2}>
        <Grid item xs={12} lg={8}>
          <IssuanceLandingCard style={{ height: '100%' }}>
            <InvestmentGrowthChart />
          </IssuanceLandingCard>
        </Grid>

        {divider}

        <Grid item xs={12} lg={4}>
          <IssuanceLandingCard style={{ height: '100%' }}>
            <TopInvestors />
          </IssuanceLandingCard>
        </Grid>

        {divider}

        <Grid item xs={12} lg={6}>
          <IssuanceLandingCard style={{ height: '100%' }}>
            <CommitmentStatsChart />
          </IssuanceLandingCard>
        </Grid>

        {divider}

        <Grid item xs={12} lg={6}>
          <IssuanceLandingCard style={{ height: '100%' }}>
            <RegionalMap />
          </IssuanceLandingCard>
        </Grid>
      </Grid>

      <VSpacer size={'extraMedium'} />

      <Grid container>
        <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
          <InvestorCommitmentTable />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
          <Activities />
        </Grid>
      </Grid>
    </>
  )
}
