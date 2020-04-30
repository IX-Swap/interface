import React from 'react'
import { Grid, Paper, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 400,
    padding: 20
  }
}))

export default function Orderbook () {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={1} className={classes.paper}>
        <Box>
          <b>ORDERBOOK</b>
        </Box>
      </Paper>
    </Grid>
  )
}
