import React from 'react'
import { Grid, Card, Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { InvestmentGrowthChart } from '../components/InvestmentGrowthChart'
import { CommitmentStatsChart } from '../components/CommitmentStatsChart'

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
              <Card variant='outlined' style={{ height: '100%' }}></Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant='outlined' style={{ height: '100%' }}></Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant='outlined' style={{ height: '100%' }}></Card>
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
              <Card variant='outlined' style={{ height: '100%' }}></Card>
            </Grid>
          </Grid>
          <Grid container direction='row' justify='space-between' spacing={4}>
            <Grid item xs={6}>
              <Card variant='outlined' style={{ height: '100%' }}>
                <CommitmentStatsChart data={undefined} isLoading={false} />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant='outlined' style={{ height: '100%' }}></Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card variant='outlined' style={{ height: '100%' }}></Card>
        </Grid>
      </Grid>
    </Box>
  )
}
