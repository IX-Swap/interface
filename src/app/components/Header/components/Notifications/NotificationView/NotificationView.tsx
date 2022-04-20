import React from 'react'
import { Typography, Grid, GridProps } from '@mui/material'
import { Notification, NotificationType } from 'types/notification'
import { useStyles } from 'app/components/Header/components/Notifications/NotificationView/NotificationView.styles'
import { privateClassNames } from 'helpers/classnames'
import { ReactComponent as SuccessIcon } from 'assets/icons/alerts/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/alerts/error.svg'
import { ReactComponent as InfoIcon } from 'assets/icons/alerts/info.svg'
import { ReactComponent as WarningIcon } from 'assets/icons/alerts/warning.svg'
import { notificationColorMap } from 'app/pages/notifications/components/config'
import { NotificationTimeAgo } from 'app/components/Header/components/Notifications/NotificationTimeAgo'
import { useMarkAsRead } from 'app/pages/notifications/hooks/useMarkAsRead'
import { MarkAsRead } from 'app/components/Header/components/Notifications/MarkAsRead/MarkAsRead'

export interface NotificationViewProps extends GridProps {
  data: Notification
  showTime?: boolean
  trimComment?: boolean
  index?: number
}

export const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <SuccessIcon />
    case 'error':
      return <ErrorIcon />
    case 'info':
      return <InfoIcon />
    case 'warning':
      return <WarningIcon />
    default:
      return <SuccessIcon />
  }
}

export const NotificationView = (props: NotificationViewProps) => {
  const { data, showTime = true, trimComment = true, ...rest } = props
  const { message, subject, createdAt, read, comment } = data
  const { mutation, isLoading } = useMarkAsRead(data)
  const handleClick = async () => {
    if (!isLoading && !read) {
      await mutation()
    }
  }
  const classes = useStyles()

  return (
    <Grid
      {...rest}
      component='div'
      data-testid='wrapper'
      className={classes.container}
      onClick={handleClick}
    >
      <Grid
        container
        data-testid='notification-inner'
        className={classes.inner}
      >
        <Grid item>{getIcon(data.type)}</Grid>
        <Grid item className={classes.content} zeroMinWidth>
          <Typography noWrap className={classes.title}>
            {subject}
          </Typography>
          <Typography color='textSecondary'>{message}</Typography>
          {/* // TODO Maybe needs to removed comment block after complete notification flow in the future */}
          <Typography
            style={{ color: notificationColorMap[data.type] }}
            noWrap={trimComment}
            className={privateClassNames()}
          >
            {comment}
          </Typography>
        </Grid>
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          justifyContent='space-between'
          className={classes.actions}
        >
          <MarkAsRead data={data} />
          {showTime && <NotificationTimeAgo createdAt={createdAt} />}
        </Grid>
      </Grid>
    </Grid>
  )
}
