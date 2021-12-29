import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { LineChart } from 'app/pages/issuance/components/LineChart/LineChart'
import { format } from 'date-fns'
import { InvestorsChartSkeleton } from 'app/pages/issuance/components/InvestorsChart/InvestorsChartSkeleton'
import { InvestmentStats } from 'types/vccDashboard'

interface InvestorsChartProps {
  investmentStats?: InvestmentStats
  isLoading: boolean
}

export const InvestorsChart = ({
  investmentStats,
  isLoading
}: InvestorsChartProps) => {
  if (isLoading) {
    return <InvestorsChartSkeleton />
  }

  let data

  if (investmentStats !== undefined) {
    const labels = Object.values(investmentStats).map(stats => stats.dsoName)
    const dates = Object.values(investmentStats)[0].data.map(value =>
      format(new Date(Number(value.year), Number(value.month) - 1), 'MMM yyyy')
    )

    const values = dates.map<any[]>((date, index) => {
      return [
        date,
        ...Object.values(investmentStats).reduce(
          (acc, cur) => [...acc, cur.data[index].count] as any,
          []
        )
      ]
    })

    values.shift()

    data = [[{ type: 'string', label: 'Month' }, ...labels], ...values]
  }

  return (
    <Paper
      elevation={0}
      variant='outlined'
      style={{ padding: 16, paddingBottom: 20 }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          container
          xs={12}
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='subtitle1'>New investors</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <LineChart data={data} />
        </Grid>
      </Grid>
    </Paper>
  )
}
