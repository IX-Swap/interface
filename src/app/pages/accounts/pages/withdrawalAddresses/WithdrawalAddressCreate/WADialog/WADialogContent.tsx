import React from 'react'
import DialogContent from '@mui/material/DialogContent'

export const WADialogContent: React.FC = ({ children, ...rest }) => {
  return <DialogContent {...rest}>{children}</DialogContent>
}
