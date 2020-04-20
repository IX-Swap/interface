import React from 'react'
import { Grid, TextField, Card, Box, Typography } from '@material-ui/core'

function Setup2fa (props) {
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item md={10} lg={10}>
        <Card component='form' elevation={1}>
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

export default Setup2fa
