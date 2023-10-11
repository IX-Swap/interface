import React, { createElement } from 'react'
import { NotificationType } from 'types/notification'
import {
  notificationColorMap,
  notificationBackgroundMap,
  notificationIconMap
} from './config'

export interface NotificationIconProps {
  type: NotificationType
}

export const NotificationIcon = (props: NotificationIconProps) => {
  const { type } = props
  const style = {
    width: 20,
    height: 20,
    // color: 'white'
    color: notificationColorMap[type]
  }

  return (
    <span
      style={{
        width: 32,
        height: 32,
        border: `2px solid ${notificationColorMap[type]}`,
        borderRadius: 40,
        // backgroundColor: notificationColorMap[type],
        backgroundColor: notificationBackgroundMap[type],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {createElement(notificationIconMap[type], { style })}
    </span>
  )
}
