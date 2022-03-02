import { Fab, Grid, Typography } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export const FABKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>FAB</Typography>
      </Grid>
      <Grid item xs={12} container alignItems='flex-start' spacing={2}>
        <Grid item>
          <Fab size='large'>
            <Icon name='plus' />
          </Fab>
        </Grid>
        <Grid item>
          <Fab size='medium'>
            <Icon name='plus' />
          </Fab>
        </Grid>
        <Grid item>
          <Fab size='small'>
            <Icon name='plus' />
          </Fab>
        </Grid>
        <Grid item xs={12} container alignItems='flex-start' spacing={2}>
          <Grid item>
            <Fab disabled size='large'>
              <Icon name='plus' />
            </Fab>
          </Grid>
          <Grid item>
            <Fab disabled size='medium'>
              <Icon name='plus' />
            </Fab>
          </Grid>
          <Grid item>
            <Fab disabled size='small'>
              <Icon name='plus' />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
