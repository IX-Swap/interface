import * as React from 'react'
import { Dialog, DialogProps, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'

interface UIDialogAction {
  callback?: () => void
  text: string
  type: 'contained' | 'alternate'
}

export type UIDialogActions =
  | []
  | [UIDialogAction]
  | [UIDialogAction, UIDialogAction]

export const UIDialog = ({ onClose, children, ...rest }: DialogProps) => {
  const classes = useStyles()

  return (
    <Dialog
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={onClose}
      {...rest}
    >
      <IconButton
        className={classes.iconWrapper}
        aria-label='close'
        onClick={() => onClose?.({}, 'escapeKeyDown')}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  )
}
