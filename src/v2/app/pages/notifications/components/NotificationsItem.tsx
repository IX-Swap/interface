import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Grid,
  Typography
} from '@material-ui/core'
import React from 'react'
import { Notification } from 'v2/types/notification'
import { useStyles } from 'v2/app/pages/notifications/components/NotificationsItem.styles'
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg'
import classNames from 'classnames'
import { MarkAsRead } from 'v2/app/pages/notifications/components/MarkAsRead'
import { useMarkAsRead } from 'v2/app/pages/notifications/hooks/useMarkAsRead'
import { ListChildComponentProps } from 'react-window'
import { getTimeAgo } from 'v2/helpers/dates'

export const NotificationsItem = (props: ListChildComponentProps) => {
  const { data, index, style } = props
  const item = data[index]
  const { message, subject, type, createdAt, read } = item as Notification
  const isSuccess = type === 'success'
  const { mutation, isLoading } = useMarkAsRead(item)
  const classes = useStyles()

  return (
    <ListItem
      ContainerComponent='div'
      ContainerProps={{ style }}
      key={index}
      className={classNames(classes.container, { [classes.unread]: !read })}
    >
      <ListItemAvatar className={classes.icon}>
        {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
      </ListItemAvatar>
      <ListItemText
        primary={<Typography noWrap>{subject}</Typography>}
        secondary={<Typography noWrap>{message}</Typography>}
      />
      <ListItemSecondaryAction className={classes.actions}>
        <Grid container direction='column' alignItems='flex-end'>
          <MarkAsRead onClick={mutation} disabled={read || isLoading} />
          <Typography>{getTimeAgo(createdAt)}</Typography>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
