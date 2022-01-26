import React from 'react'
import { Typography, Grid, GridProps } from '@mui/material'
import classNames from 'classnames'
import { Notification } from 'types/notification'
import { useStyles } from 'app/pages/notifications/components/NotificationsItem.styles'
import { NotificationIcon } from './NotificationIcon'
import { NotificationTimeAgo } from './NotificationTimeAgo'
import { notificationColorMap } from './config'
import { privateClassNames } from 'helpers/classnames'

export interface NotificationViewProps extends GridProps {
  data: Notification
  action: JSX.Element
  showTime?: boolean
  trimComment?: boolean
  index?: number
}

export const NotificationView = (props: NotificationViewProps) => {
  const { data, action, showTime = true, trimComment = true, ...rest } = props
  const { message, subject, createdAt, read, comment } = data
  const classes = useStyles()

  return (
    <Grid {...rest} component='div' className={classNames(classes.container)}>
      <Grid
        container
        data-testid='notification-inner'
        className={classNames(classes.inner, { [classes.unread]: !read })}
      >
        <Grid item className={classes.icon}>
          <NotificationIcon type={data.type} />
        </Grid>
        <Grid item className={classes.content} zeroMinWidth>
          <Typography noWrap>{subject}</Typography>
          <Typography color='textSecondary'>{message}</Typography>
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
          {action}
          {showTime && <NotificationTimeAgo createdAt={createdAt} />}
        </Grid>
      </Grid>
    </Grid>
  )
}
