import React, { ReactNode } from 'react'
import { ToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useStyles } from 'ui/Alerts/AlertsContent/AlertsContent.styles'
import { Box, Button } from '@mui/material'
import { Actions } from 'hooks/useToast'

export interface AlertsContentProps extends Partial<ToastContentProps> {
  message: ReactNode
  actions?: Actions
  fullWidth?: boolean
}

export const AlertContent = ({
  message,
  closeToast,
  actions = [],
  fullWidth = false
}: AlertsContentProps) => {
  const classes = useStyles({ fullWidth })

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.message}>{message}</Box>

      {actions.length > 0 && (
        <>
          {actions.map(item => {
            return (
              <Button
                variant={'text'}
                className={classes.button}
                onClick={() => {
                  item.callback()
                  closeToast?.()
                }}
              >
                {item.buttonText}
              </Button>
            )
          })}
        </>
      )}
    </Box>
  )
}
