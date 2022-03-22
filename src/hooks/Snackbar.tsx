import React, { ReactNode } from 'react'
import { Grid, Card, Typography, IconButton } from '@mui/material'
import { AppearanceTypes, ToastProps } from 'react-toast-notifications'
import { useStyles } from 'app/pages/notifications/components/NotificationsItem.styles'
import classNames from 'classnames'
import { Close } from '@mui/icons-material'
import { NotificationIcon } from 'app/pages/notifications/components/NotificationIcon'

export interface SnackbarProps {
  message: ReactNode
  variant: AppearanceTypes
}

export const Snackbar = (props: SnackbarProps) => {
  const { message, variant, onDismiss } = props as SnackbarProps & ToastProps
  const classes = useStyles()

  return (
    <Card
      square
      elevation={0}
      className={classNames(classes.container, classes.unread)}
    >
      <Grid container alignItems='center' className={classes.inner}>
        <Grid item className={classes.icon}>
          <NotificationIcon type={variant} />
        </Grid>
        <Grid item className={classes.content}>
          <Typography>{message}</Typography>
        </Grid>
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          justifyContent='space-between'
          className={classes.actions}
        >
          <IconButton onClick={() => onDismiss()} size='small'>
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  )
}
