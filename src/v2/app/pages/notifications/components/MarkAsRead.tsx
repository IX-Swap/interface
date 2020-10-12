import React from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { useStyles } from 'v2/app/pages/notifications/components/MarkAsRead.styles'

export interface MarkAsReadProps {
  onClick: () => any
  disabled: boolean
}

export const MarkAsRead = (props: MarkAsReadProps) => {
  const classes = useStyles()

  return (
    <Tooltip title='Mark as read'>
      <Button
        className={classes.container}
        component='div'
        onClick={props.onClick}
        disabled={props.disabled}
      />
    </Tooltip>
  )
}
