import React from 'react'
import useStyles from './FormDialog.styles'
import DialogTitle from '@mui/material/DialogTitle'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface TitleProps {
  label: string
  onClose: () => void
}
export const FormDialogTitle = ({ label, onClose, ...rest }: TitleProps) => {
  const classes = useStyles()

  return (
    <DialogTitle className={classes.title} {...rest}>
      {label}
      <IconButton className={classes.closeButton} onClick={onClose} size="large">
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
    </DialogTitle>
  );
}
