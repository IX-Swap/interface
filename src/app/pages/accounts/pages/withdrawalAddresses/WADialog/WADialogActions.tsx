import React from 'react'
import useStyles from './WADialog.styles'
import DialogActions from '@material-ui/core/DialogActions'

export const WADialogActions: React.FC = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <DialogActions className={classes.actions} {...rest}>
      {children}
    </DialogActions>
  )
}
