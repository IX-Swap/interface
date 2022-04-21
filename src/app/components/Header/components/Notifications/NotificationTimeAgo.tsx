import { Typography } from '@mui/material'
import React from 'react'
import { getTimeAgo } from 'helpers/dates'

export interface NotificationTimeAgoProps {
  createdAt: string
}

export const NotificationTimeAgo = (props: NotificationTimeAgoProps) => {
  return (
    <Typography variant='caption' fontSize={12} color='textSecondary'>
      {getTimeAgo(props.createdAt)}
    </Typography>
  )
}
