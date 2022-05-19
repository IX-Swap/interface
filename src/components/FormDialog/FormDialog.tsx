import React from 'react'
import { DialogProps } from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export const FormDialog: React.FC<DialogProps> = ({
  children,
  open,
  onClose,
  ...rest
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <UIDialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
      {...rest}
    >
      {children}
    </UIDialog>
  )
}
