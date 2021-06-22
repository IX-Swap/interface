import React from 'react'
import useStyles from './FormDialog.styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export interface TitleProps {
  label: string
  onClose: () => void
}
export const FormDialogTitle = ({ label, onClose, ...rest }: TitleProps) => {
  const classes = useStyles()

  return (
    <DialogTitle disableTypography className={classes.title} {...rest}>
      {label}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
    </DialogTitle>
  )
}
