import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'

export interface TitleProps {
  label: string
}
export const WADialogTitle = ({ label, ...rest }: TitleProps) => {
  return <DialogTitle {...rest}>{label}</DialogTitle>
}
