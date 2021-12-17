import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { LineChart } from 'app/pages/issuance/components/LineChart/LineChart'

export const InvestorsChart = () => {
  const data = undefined

  return (
    <Paper
      elevation={0}
      variant='outlined'
      style={{ padding: 16, paddingBottom: 80 }}
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
          <LineChart data={data} />
        </Grid>
      </Grid>
    </Paper>
  )
}
