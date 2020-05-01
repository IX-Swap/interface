import React from 'react'
import { Grid, Paper, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    padding: 20
  }
}))

export default function Diligence () {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Box>
          <b>DILIGENCE</b>
        </Box>
      </Paper>
    </Grid>
  )
}
