import React, { createElement } from 'react'
import { NotificationType } from 'types/notification'
import { notificationColorMap, notificationIconMap } from './config'

export interface NotificationIconProps {
  type: NotificationType
}

export const NotificationIcon = (props: NotificationIconProps) => {
  const { type } = props
  const style = {
    width: 30,
    height: 30,
    color: 'white'
  }

  return (
    <span
      style={{
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: notificationColorMap[type],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {createElement(notificationIconMap[type], { style })}
    </span>
  )
}
