import { Button, Grid } from '@mui/material'
import React from 'react'

export interface TaxDeclarationInfoActionProps {
  close?: () => void
  label?: string
}
export const TaxDeclarationInfoAction: React.FC<
  TaxDeclarationInfoActionProps
> = ({ close, label }) => {
  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item xs={12}>
          <Button
            fullWidth
            size='large'
            color='primary'
            onClick={close}
            variant='contained'
          >
            {label != null ? label : 'Proceed Now'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
