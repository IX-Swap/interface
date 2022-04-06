import { Button, Grid } from '@mui/material'
import React from 'react'

export interface ButtonsSamplesProps {
  color:
    | 'special-red'
    | 'special-green'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
  variant?: 'text' | 'contained' | 'outlined' | 'alternate'
}
export const ButtonsSamples = ({
  color,
  variant = 'contained'
}: ButtonsSamplesProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={1}>
        <Grid item>
          <Button color={color} variant={variant} size='large' disableElevation>
            Large
          </Button>
        </Grid>
        <Grid item>
          <Button color={color} variant={variant} disableElevation>
            Medium
          </Button>
        </Grid>
        <Grid item>
          <Button color={color} variant={variant} size='small' disableElevation>
            Small
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={1}>
        <Grid item>
          <Button
            color={color}
            variant={variant}
            size='large'
            disableElevation
            disabled
          >
            Large
          </Button>
        </Grid>
        <Grid item>
          <Button color={color} variant='contained' disableElevation disabled>
            Medium
          </Button>
        </Grid>
        <Grid item>
          <Button
            color={color}
            variant={variant}
            size='small'
            disableElevation
            disabled
          >
            Small
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
