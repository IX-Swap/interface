import { Button, Grid } from '@mui/material'
import React from 'react'

export interface TaxDeclarationInfoActionProps {
  close?: () => void
}
export const TaxDeclarationInfoAction: React.FC<
  TaxDeclarationInfoActionProps
> = ({ close }) => {
  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item>
          <Button color='primary' onClick={close} variant='contained'>
            Ok
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
