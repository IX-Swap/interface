import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

export const IconButtonKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Icon Button</Typography>
      </Grid>
      <Grid item xs={12} container alignItems='flex-start' spacing={2}>
        <Grid item>
          <IconButton size='large'>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='medium'>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='small'>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignItems='flex-start' spacing={2}>
        <Grid item>
          <IconButton size='large' disabled>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='medium' disabled>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size='small' disabled>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
