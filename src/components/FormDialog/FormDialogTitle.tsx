import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'

export interface TitleProps {
  label: string
  onClose: () => void
}
export const FormDialogTitle = ({ label, onClose, ...rest }: TitleProps) => {
  return <DialogTitle {...rest}>{label}</DialogTitle>
}
