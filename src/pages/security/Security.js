import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, TextField, Card, Box, Typography } from '@material-ui/core'
import Setup2fa from './components/Setup2fa'

function Security (props) {
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item md={10} lg={10}>
        <Setup2fa />
      </Grid>
    </Grid>
  )
}

export default withRouter(Security)
