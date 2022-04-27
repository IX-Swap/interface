import React from 'react'
import { Grid, Hidden } from '@mui/material'
import { InvestmentGrowthChart } from '../components/InvestmentGrowthChart'
import { CommitmentStatsChart } from '../components/CommitmentStatsChart'
import { DSOInfo } from '../components/DSOInfo'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { MoreOptions } from '../components/MoreOptions'
import { RegionalMap } from '../components/IssuanceLanding/RegionalMap'
import { Activities } from '../components/IssuanceLanding/Activities'
import { TopInvestors } from '../components/IssuanceLanding/TopInvestors'
import { TotalInvestors } from 'app/pages/issuance/components/CapTable/TotalInvestors'
import { DSOFilter } from '../components/IssuanceLanding/DSOFilter'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IssuanceLandingCard } from 'ui/SecondaryCard'
import { RootContainer } from 'ui/RootContainer'

export const IssuanceLanding = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const { theme, isTablet } = useAppBreakpoints()

  const divider = (
    <Hidden mdUp>
      <Grid item xs={12}>
        <VSpacer size='small' />
      </Grid>
    </Hidden>
  )

  return (
    <>
      <PageHeader title={data?.tokenName} showBreadcrumbs={false} />
      <RootContainer>
        <Grid
          container
          spacing={3}
          justifyContent='space-between'
          wrap={!isTablet ? 'wrap' : 'wrap-reverse'}
        >
          <Grid
            item
            container
            direction='row'
            spacing={isTablet ? 0 : 3}
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
              <IssuanceLandingCard
                variant='outlined'
                style={{ height: '100%' }}
              >
                <AmountRaised />
              </IssuanceLandingCard>
            </Grid>

            {divider}

            <Grid item xs={12} md={4} lg={4}>
              <IssuanceLandingCard
                variant='outlined'
                style={{ height: '100%' }}
              >
                <TargetFundraise />
              </IssuanceLandingCard>
            </Grid>

            {divider}

            <Grid item xs={12} lg={8}>
              <IssuanceLandingCard
                variant='outlined'
                style={{ height: '100%' }}
              >
                <InvestmentGrowthChart />
              </IssuanceLandingCard>
            </Grid>

            {divider}

            <Grid item xs={12} lg={4}>
              <IssuanceLandingCard
                variant='outlined'
                style={{ height: '100%' }}
              >
                <TopInvestors />
              </IssuanceLandingCard>
            </Grid>

            {divider}

            <Grid item xs={12} lg={6}>
              <IssuanceLandingCard
                variant='outlined'
                style={{ height: '100%' }}
              >
                <CommitmentStatsChart />
              </IssuanceLandingCard>
            </Grid>

            {divider}

            <Grid item xs={12} lg={6}>
              <IssuanceLandingCard
                variant='outlined'
                style={{ height: '100%' }}
              >
                <RegionalMap />
              </IssuanceLandingCard>
            </Grid>
          </Grid>

          {divider}

          <Grid container item xs={12} md={4}>
            <Grid
              component={IssuanceLandingCard}
              container
              item
              xs={12}
              direction='column'
              justifyContent={isValidDSOId(dsoId) ? 'flex-start' : 'center'}
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
      </RootContainer>

      <Grid container>
        <Grid item xs={12}>
          <Activities />
        </Grid>
      </Grid>
    </>
  )
}
