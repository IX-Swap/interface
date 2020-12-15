import React from 'react'
import useStyles from './WADialog.styles'
import DialogContent from '@material-ui/core/DialogContent'

export const WADialogContent: React.FC = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <DialogContent className={classes.content} {...rest}>
      {children}
    </DialogContent>
  )
}
