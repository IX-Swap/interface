import { Button } from '@mui/material'
import React from 'react'
import useStyles from './common.style'

export interface TaxDeclarationInfoActionProps {
  close?: () => void
}
export const TaxDeclarationInfoAction: React.FC<
  TaxDeclarationInfoActionProps
> = ({ close }) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.actionButton}
      color='primary'
      onClick={close}
      variant='contained'
    >
      Ok
    </Button>
  )
}
