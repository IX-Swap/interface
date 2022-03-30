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
          onClick={() => action()}
          variant={'outlined'}
          color={'primary'}
          data-testid='okBtn'
        >
          Ok
        </Button>
      </Grid>
    </Grid>
  )
}
