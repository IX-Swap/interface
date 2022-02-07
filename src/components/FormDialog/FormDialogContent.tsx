import React from 'react'
import useStyles from './FormDialog.styles'
import DialogContent from '@mui/material/DialogContent'

export interface FormDialogContentProps {
  noPadding?: boolean
}

export const FormDialogContent: React.FC<FormDialogContentProps> = ({
  children,
  noPadding = false,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <DialogContent
      className={noPadding ? classes.noPaddingContent : classes.content}
      {...rest}
    >
      {children}
    </DialogContent>
  )
}
