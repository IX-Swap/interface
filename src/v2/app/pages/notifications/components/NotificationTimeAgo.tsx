import { Typography } from '@material-ui/core'
import React from 'react'
import { getTimeAgo } from 'v2/helpers/dates'

export interface NotificationTimeAgoProps {
  createdAt: string
}

export const NotificationTimeAgo = (props: NotificationTimeAgoProps) => {
  return (
    <Typography variant='caption' color='textSecondary'>
      {getTimeAgo(props.createdAt)}
    </Typography>
  )
}
