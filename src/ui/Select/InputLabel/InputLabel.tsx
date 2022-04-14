import React from 'react'
import {
  InputLabelProps as MUIInputLabelProps,
  InputLabel as MuiInputLabel
} from '@mui/material'
import { useStyles } from './InputLabel.styles'

export interface InputLabelProps extends MUIInputLabelProps {}

export const InputLabel = ({ ...props }: InputLabelProps) => {
  const classes = useStyles()

  return <MuiInputLabel {...props} shrink className={classes.wrapper} />
}
