import { Grid, Typography } from '@mui/material'
import React from 'react'
import { DropdownMenu } from 'ui/UIKit/ButtonKit/DropdownMenu'

export const DropdownKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Dropdown</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Outlined</Typography>
        </Grid>
        <Grid item>
          <DropdownMenu buttonSize='large' />
        </Grid>
        <Grid item>
          <DropdownMenu />
        </Grid>
        <Grid item>
          <DropdownMenu buttonSize='small' />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Contained</Typography>
        </Grid>
        <Grid item>
          <DropdownMenu buttonSize='large' buttonVariant='contained' />
        </Grid>
        <Grid item>
          <DropdownMenu buttonVariant='contained' />
        </Grid>
        <Grid item>
          <DropdownMenu buttonSize='small' buttonVariant='contained' />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Disabled</Typography>
        </Grid>
        <Grid item>
          <DropdownMenu buttonSize='large' buttonVariant='contained' disabled />
        </Grid>
        <Grid item>
          <DropdownMenu buttonVariant='contained' disabled />
        </Grid>
        <Grid item>
          <DropdownMenu buttonSize='small' buttonVariant='contained' disabled />
        </Grid>
      </Grid>
    </Grid>
  )
}
