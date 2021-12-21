import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { LineChart } from 'app/pages/issuance/components/LineChart/LineChart'
import { format } from 'date-fns'
// import { InvestorsSkeleton } from 'app/pages/issuance/components/InvestorsChart/InvestorsSkeleton'

export const InvestorsChart = () => {
  // TODO Uncomment this after complete backend api
  // if (isLoading) {
  //   return <InvestorsSkeleton />
  // }

  // TODO Remove this after complete backend api
  const fakeData = [
    [
      { type: 'string', label: 'Month' },
      'IXD SF 1',
      'IXD SF 2',
      'IXD SF 3',
      'IXD SF 4',
      'IXD SF 5'
    ],
    [format(new Date(2014, 0), 'MMM yyyy'), 0, 1, 2, 3, 5],
    [format(new Date(2014, 1), 'MMM yyyy'), 2, 2, 3, 4, 5],
    [format(new Date(2014, 2), 'MMM yyyy'), 0.5, 2, 4, 5, 6],
    [format(new Date(2014, 3), 'MMM yyyy'), 2.9, 5, 5, 6, 7],
    [format(new Date(2014, 4), 'MMM yyyy'), 6.3, 1.6, 7, 8, 9]
  ]

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
            <Typography variant='subtitle1'>Investors</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <LineChart data={fakeData} />
        </Grid>
      </Grid>
    </Paper>
  )
}
