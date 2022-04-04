import React from 'react'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useStyles } from 'ui/Alerts/AlertsContainer/AlertsContainer.styles'

export const AlertsContainer = () => {
  const classes = useStyles()

  return (
    <ToastContainer
      position={'bottom-right'}
      className={classes.wrapper}
      transition={Slide}
      limit={3}
    />
  )
}
