import { Button, Grid } from '@material-ui/core'
import React from 'react'

export interface TaxDeclarationInfoActionProps {
  close?: () => void
}
export const TaxDeclarationInfoAction: React.FC<TaxDeclarationInfoActionProps> =
  ({ close }) => {
    return (
      <>
        <Grid container justify='center'>
          <Grid item>
            <Button color='primary' onClick={close} variant='contained'>
              Ok
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
