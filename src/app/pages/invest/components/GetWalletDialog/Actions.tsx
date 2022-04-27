import { Button, Grid } from '@mui/material'
import React from 'react'

export interface ActionProps {
  action: Function
}
export const Actions: React.FC<ActionProps> = ({ action }) => {
  return (
    <Grid container justifyContent='center'>
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
