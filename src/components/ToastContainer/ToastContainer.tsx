import React from 'react'
import {
  ToastContainerProps,
  DefaultToastContainer
} from 'react-toast-notifications'
import useStyles from './ToastContainer.styles'

export const ToastContainer = (props: ToastContainerProps) => {
  const classes = useStyles()
  return <DefaultToastContainer {...props} className={classes.root} />
}
