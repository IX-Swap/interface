import { Button, ButtonGroup, Grid, Typography } from '@mui/material'
import React from 'react'

export const ButtonGroupKit = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Button Group</Typography>
      </Grid>
      <Grid item>
        <ButtonGroup variant='outlined' size='large'>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup variant='outlined' size='medium'>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup variant='outlined' size='small'>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
