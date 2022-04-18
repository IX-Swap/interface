import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { StepperExample } from 'ui/UIKit/StepperKit/StepperExample'

export const StepperKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={4} alignContent='center'>
        <Grid item xs={12}>
          <Typography variant='h2'>Stepper</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Horizontal</Typography>
        </Grid>

        <Grid item xs={12}>
          <StepperExample />
        </Grid>

        <Grid item xs={12}>
          <Typography>Vertical</Typography>
        </Grid>

        <Grid item xs={12}>
          <Box width={175}>
            <StepperExample orientation={'vertical'} />
          </Box>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}
