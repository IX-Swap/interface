import React from 'react'
import useStyles from './FormDialog.styles'
import DialogContent from '@material-ui/core/DialogContent'

export const FormDialogContent: React.FC = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <DialogContent className={classes.content} {...rest}>
      {children}
    </DialogContent>
  )
}
