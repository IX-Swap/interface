import React from 'react'
import { Grid, Paper, Box } from '@material-ui/core'
import useStyles from 'v1/pages/exchange/styles'

export default function News () {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Box>
          <b>NEWS</b>
        </Box>
      </Paper>
    </Grid>
  )
}
