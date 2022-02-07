import React from 'react'
import useStyles from './FormDialog.styles'
import DialogActions from '@mui/material/DialogActions'

export const FormDialogActions: React.FC = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <DialogActions className={classes.actions} {...rest}>
      {children}
    </DialogActions>
  )
}
