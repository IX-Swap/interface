import React from 'react'
import useStyles from './FormDialog.styles'
import DialogTitle from '@mui/material/DialogTitle'

export interface TitleProps {
  label: string
  onClose: () => void
}
export const FormDialogTitle = ({ label, onClose, ...rest }: TitleProps) => {
  const classes = useStyles()

  return (
    <DialogTitle className={classes.title} {...rest}>
      {label}
    </DialogTitle>
  )
}
