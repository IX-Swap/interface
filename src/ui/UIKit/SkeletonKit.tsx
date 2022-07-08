import { Grid, Typography, Stack, Skeleton } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const SkeletonKit = () => {
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={1} alignContent='center'>
        <Grid item xs={12}>
          <Typography variant='h2'>Skeleton</Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Stack spacing={1}>
            <Skeleton variant='text' />
            <Skeleton variant='circular' width={40} height={40} />
            <Skeleton variant='rectangular' width={210} height={118} />
          </Stack>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}
