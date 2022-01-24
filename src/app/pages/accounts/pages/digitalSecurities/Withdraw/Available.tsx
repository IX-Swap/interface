import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'

export interface AvailableProps {
  tokenCurrencySymbol: string
  available: number
}

export const Available = ({
  tokenCurrencySymbol,
  available
}: AvailableProps) => {
  return (
    <Grid container spacing={1} justifyContent='flex-end'>
      <Grid item>
        <Typography variant='body1' align='right'>
          <Box component='span' fontWeight='bold'>
            {tokenCurrencySymbol} {available}
          </Box>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1'>Available</Typography>
      </Grid>
    </Grid>
  )
}
