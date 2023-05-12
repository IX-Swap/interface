import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ReactComponent as SingpassLogo } from 'assets/singpass-logo-color.svg'

export const DialogHeader = () => {
  return (
    <Grid container >
      <Grid item>
        <Box>
          <SingpassLogo />
        </Box>
      </Grid>
      <Grid item mt={5} ml={5}>
        <Typography
          variant='h2'
          sx={{ color: '#000', textTransform: 'uppercase' }}
        >
          Please Note
        </Typography>
      </Grid>
    </Grid>
  )
}
