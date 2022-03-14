import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKitThemeWrapper'

export const TypographyKit = () => {
  return (
    <UIKitThemeWrapper>
      <Paper>
        <Grid
          container
          spacing={2}
          alignItems='flex-start'
          sx={{
            padding: 4
          }}
        >
          <Grid item container xs={12} md={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h2'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h3'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4'>IXPrime Title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5'>IXPrime Title</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>subtitle1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>subtitle2</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1'>body1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>body2</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={3} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='caption'>caption</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='overline'>overline</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </UIKitThemeWrapper>
  )
}
