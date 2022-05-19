import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import { Box } from '@mui/material'

export interface TitleProps {
  label: string | JSX.Element
  onClose: () => void
}
export const FormDialogTitle = ({ label, onClose, ...rest }: TitleProps) => {
  return (
    <DialogTitle {...rest}>
      <Box pt={2} textAlign='center'>
        {label}
      </Box>
    </DialogTitle>
  )
}
