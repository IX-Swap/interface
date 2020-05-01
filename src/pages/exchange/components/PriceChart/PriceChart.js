import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import ApexLineChart from './ApexLineChart'

import useStyles from 'pages/exchange/styles'

export default function PriceChart ({ series }) {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <ApexLineChart series={series} />
      </Paper>
    </Grid>
  )
}
