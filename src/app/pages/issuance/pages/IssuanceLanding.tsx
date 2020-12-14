import React from 'react'
import { Grid, Card, Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { InvestmentGrowthChart } from '../components/InvestmentGrowthChart'
import { CommitmentStatsChart } from '../components/CommitmentStatsChart'
import { DSOInfo } from '../components/DSOInfo'
import { CountdownTimer } from '../components/CountdownTimer'
import { MoreOptions } from '../components/MoreOptions'
import { RegionalMap } from '../components/IssuanceLanding/RegionalMap'
import { Activities } from '../components/IssuanceLanding/Activities'
import { TopInvestors } from '../components/IssuanceLanding/TopInvestors'
import { TotalInvestors } from '../components/IssuanceLanding/TotalInvestors'
import { DSOFilter } from '../components/IssuanceLanding/DSOFilter'
import { AmountRaised } from '../components/IssuanceLanding/AmountRaised'
import { TargetFundraise } from '../components/IssuanceLanding/TargetFundraise'

export const IssuanceLanding = () => {
  const theme = useTheme()

  return (
    <Box ml={theme.spacing(0.5)}>
      <Grid container justify='space-between' spacing={8}>
        <Grid
          container
          xs={8}
          direction='column'
          spacing={0}
          style={{
            paddingBottom: theme.spacing(4),
            paddingTop: theme.spacing(4)
          }}
        >
          <Grid
            container
            direction='row'
            justify='space-between'
            spacing={4}
            style={{ paddingBottom: theme.spacing(4) }}
          >
            <Grid item xs={4}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <TotalInvestors />
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <AmountRaised />
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <TargetFundraise />
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justify='space-between'
            spacing={4}
            style={{ paddingBottom: theme.spacing(4) }}
          >
            <Grid item xs={8}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <InvestmentGrowthChart data={undefined} isLoading={false} />
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <TopInvestors />
              </Card>
            </Grid>
          </Grid>
          <Grid container direction='row' justify='space-between' spacing={4}>
            <Grid item xs={6}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <CommitmentStatsChart data={undefined} isLoading={false} />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <RegionalMap />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            component={Card}
            variant='outlined'
            style={{ height: '100%', padding: theme.spacing(4) }}
            justify='center'
            alignItems='flex-start'
            spacing={1}
          >
            <DSOInfo dso={undefined} corporate={undefined} />
            <CountdownTimer launchDate={undefined} />
            <DSOFilter />
            <Box width='100%'>
              <MoreOptions dsoId={undefined} />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0, paddingLeft: 0 }}>
          <Card variant='outlined'>
            <Activities />
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
