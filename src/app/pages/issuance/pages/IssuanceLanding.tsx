import React from 'react'
import { Grid, Card, Hidden } from '@material-ui/core'
import { InvestmentGrowthChart } from '../components/InvestmentGrowthChart'
import { CommitmentStatsChart } from '../components/CommitmentStatsChart'
import { DSOInfo } from '../components/DSOInfo'
import { CountdownTimer } from '../components/CountdownTimer/CountdownTimer'
import { MoreOptions } from '../components/MoreOptions'
import { RegionalMap } from '../components/IssuanceLanding/RegionalMap'
import { Activities } from '../components/IssuanceLanding/Activities'
import { TopInvestors } from '../components/IssuanceLanding/TopInvestors'
import { TotalInvestors } from '../components/IssuanceLanding/TotalInvestors'
import { DSOFilter } from '../components/IssuanceLanding/DSOFilter'
import { AmountRaised } from '../components/IssuanceLanding/AmountRaised'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { useParams } from 'react-router-dom'
import { TargetFundraise } from 'app/pages/issuance/components/IssuanceLanding/TargetFundraise'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

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
      <PageHeader title={data?.tokenName} />
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
            <Card variant='outlined' style={{ height: '100%' }}>
              <TotalInvestors />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <Card variant='outlined' style={{ height: '100%' }}>
              <AmountRaised />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} md={4} lg={4}>
            <Card variant='outlined' style={{ height: '100%' }}>
              <TargetFundraise />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} lg={8}>
            <Card variant='outlined' style={{ height: '100%' }}>
              <InvestmentGrowthChart />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} lg={4}>
            <Card variant='outlined' style={{ height: '100%' }}>
              <TopInvestors />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} lg={6}>
            <Card variant='outlined' style={{ height: '100%' }}>
              <CommitmentStatsChart />
            </Card>
          </Grid>

          {divider}

          <Grid item xs={12} lg={6}>
            <Card variant='outlined' style={{ height: '100%' }}>
              <RegionalMap />
            </Card>
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
            component={Card}
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
          <Card variant='outlined'>
            <Activities />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
