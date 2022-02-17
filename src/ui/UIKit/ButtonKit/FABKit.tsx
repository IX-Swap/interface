import { Fab, Grid, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

export const FABKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>FAB</Typography>
      </Grid>
      <Grid item xs={12} container alignItems='flex-start' spacing={2}>
        <Grid item>
          <Fab size='large'>
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab size='medium'>
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab size='small'>
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12} container alignItems='flex-start' spacing={2}>
          <Grid item>
            <Fab disabled size='large'>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab disabled size='medium'>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab disabled size='small'>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
