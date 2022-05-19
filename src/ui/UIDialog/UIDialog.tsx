import * as React from 'react'
import { Dialog, DialogProps } from '@mui/material'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'
import { Icon } from 'ui/Icons/Icon'

export const UIDialog = ({ onClose, children, ...rest }: DialogProps) => {
  const classes = useStyles()

  return (
    <Dialog onClose={onClose} {...rest}>
      <Icon
        className={classes.iconWrapper}
        name='close'
        onClick={() => onClose?.({}, 'escapeKeyDown')}
      />
      {children}
    </Dialog>
  )
}
