import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ReactComponent as SingpassLogo } from 'assets/singpass-logo-color.svg'

export const DialogHeader = () => {
  return (
    <Grid container justifyContent='space-between'>
      <Grid item>
        <Typography
          variant='h2'
          sx={{ color: '#000', textTransform: 'uppercase' }}
        >
          Please Note
        </Typography>
      </Grid>
      <Grid item>
        <Box pt={1}>
          <SingpassLogo />
        </Box>
      </Grid>
    </Grid>
  )
}
