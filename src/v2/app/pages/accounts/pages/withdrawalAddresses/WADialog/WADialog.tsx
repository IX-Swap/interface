import React from 'react'
import useStyles from './WADialog.styles'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { history } from 'v2/history'

export const WADialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      onClose={history.goBack}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className={classes.root}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
