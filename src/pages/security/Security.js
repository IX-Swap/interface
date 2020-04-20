import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, TextField, Card, Box, Typography } from '@material-ui/core'

function Security (props) {
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item md={10} lg={10}>
        <Card component='form'>
          <Box p={2}>
            <Typography variant='h2'>Setup 2fa</Typography>
          </Box>
          <Box m={4}>
            <TextField />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default withRouter(Security)
