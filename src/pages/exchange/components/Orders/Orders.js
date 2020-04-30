import React from 'react'
import { Grid, Paper, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 300,
    padding: 20
  }
}))

export default function Orders () {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={1} className={classes.paper}>
        <Box>
          <b>ORDERS</b>
        </Box>
      </Paper>
    </Grid>
  )
}
