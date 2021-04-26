import React from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export const FormDialog: React.FC<DialogProps> = ({
  children,
  open,
  onClose,
  ...rest
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
