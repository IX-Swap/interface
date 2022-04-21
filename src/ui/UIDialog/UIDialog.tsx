import * as React from 'react'
import { Dialog, DialogProps } from '@mui/material'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'
import { Icon } from 'ui/Icons/Icon'

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
      <Icon
        className={classes.iconWrapper}
        name='close'
        onClick={() => onClose?.({}, 'escapeKeyDown')}
      />
      {children}
    </Dialog>
  )
}
