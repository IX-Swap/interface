import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export const IconButtonKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Icon Button</Typography>
      </Grid>
      <Grid item xs={12} container alignItems='flex-start' spacing={2}>
        <Grid item>
          <IconButton size='large'>
            <Icon name='plus' />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='medium'>
            <Icon name='plus' />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='small'>
            <Icon name='plus' />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignItems='flex-start' spacing={2}>
        <Grid item>
          <IconButton size='large' disabled>
            <Icon name='plus' />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='medium' disabled>
            <Icon name='plus' />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='small' disabled>
            <Icon name='plus' />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
