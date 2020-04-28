import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Paper, Box } from '@material-ui/core'

function Trades (props) {
  return (
    <Grid item>
      <Paper elevation={1} variant='outlined'>
        <Box p={3}>This is a component</Box>
      </Paper>
    </Grid>
  )
}

export default withRouter(Trades)
