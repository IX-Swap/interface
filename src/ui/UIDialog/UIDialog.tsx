import * as React from 'react'
import { Dialog, DialogProps } from '@mui/material'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'
import { Icon } from 'ui/Icons/Icon'

export interface UIDialogProps extends DialogProps {
  showIconClose?: boolean
  isMobile?: boolean
}

export const UIDialog = ({
  onClose,
  children,
  showIconClose = true,
  isMobile,
  ...rest
}: UIDialogProps) => {
  const classes = useStyles()

  return (
    <Dialog onClose={onClose} {...rest}>
      {showIconClose && (
        <Icon
          className={isMobile ? classes.mobileWrapper : classes.iconWrapper}
          name='close'
          onClick={() => onClose?.({}, 'escapeKeyDown')}
        />
      )}

      {children}
    </Dialog>
  )
}
