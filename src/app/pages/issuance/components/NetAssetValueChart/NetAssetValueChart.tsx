import { Grid, Paper, Typography } from '@material-ui/core'
import { NoData } from 'app/pages/issuance/components/NetAssetValueChart/NoData'
import { PeriodicalFilter } from 'app/pages/issuance/components/NetAssetValueChart/PeriodicalFilter'
import React from 'react'
import Chart from 'react-google-charts'

export const NetAssetValueChart = () => {
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
            <Typography variant='subtitle1'>Net Asset Value</Typography>
          </Grid>
          <Grid item>
            <PeriodicalFilter />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {data === undefined ? (
            <NoData />
          ) : (
            <Chart
              chartType='LineChart'
              data={data}
              options={{
                height: 400,
                chartArea: {
                  left: 40,
                  top: 10,
                  width: '95%',
                  height: 300
                },
                tooltip: { isHtml: true },
                legend: { position: 'bottom', alignment: 'start' },
                hAxis: {
                  baselineColor: 'transparent',
                  gridlines: {
                    color: 'transparent'
                  },
                  textStyle: {
                    color: 'rgba(0, 0, 0, 0)'
                  }
                }
              }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}
