import React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export const FormDialog: React.FC<DialogProps> = ({
  children,
  open,
  onClose,
  ...rest
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

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
