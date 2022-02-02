import { Box, Button, Paper, Grid, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'

export const DownloadTemplate = () => {
  return (
    <Paper elevation={0} style={{ backgroundColor: grey[100] }}>
      <Box px={3} py={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Download Template</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              Please download the financial report template from below and
              upload it once you fill up the details. If you already have
              reports then upload it either in CSV or PDF format.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined'>Download</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
