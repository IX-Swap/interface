import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import { Typography } from '@mui/material'

export interface TitleProps {
  label: string
}
export const WADialogTitle = ({ label, ...rest }: TitleProps) => {
  return (
    <DialogTitle {...rest}>
      <Typography variant='h2' component='span' align='center'>
        {label}
      </Typography>
    </DialogTitle>
  )
}
