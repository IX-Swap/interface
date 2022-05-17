import { Button, Grid } from '@mui/material'
import React from 'react'

export interface ActionProps {
  action: Function
  cancel: Function
}
export const Actions: React.FC<ActionProps> = ({ action, cancel }) => {
  return (
    <Grid spacing={2} container justifyContent='center'>
      <Grid item>
        <Button
          color='primary'
          onClick={() => cancel()}
          variant='alternate'
          data-testid='getAddressBtn'
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          color='primary'
          onClick={() => action()}
          variant='contained'
          data-testid='getAddressBtn'
        >
          Get Address
        </Button>
      </Grid>
    </Grid>
  )
}
