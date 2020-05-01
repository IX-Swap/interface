import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import ApexLineChart from './ApexLineChart'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 240,
    padding: 20
  }
}))

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
