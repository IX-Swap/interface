import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import { Box } from '@mui/material'

export interface TitleProps {
  label: string
}
export const WADialogTitle = ({ label, ...rest }: TitleProps) => {
  return (
    <DialogTitle {...rest}>
      <Box pt={2} textAlign='center'>
        {label}
      </Box>
    </DialogTitle>
  )
}
