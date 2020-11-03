import React from 'react'
import { ToastProps } from 'v2/components/Toast'
import { Notification } from 'v2/types/notification'
import { NotificationGoToItem } from './NotificationGoToItem'
import { NotificationView } from './NotificationView'
import { NotificationToastClose } from './NotificationToastClose'

export interface NotificationToastProps {
  data: Notification
}

export const NotificationToast = (props: NotificationToastProps) => {
  const { onDismiss } = props as NotificationToastProps & ToastProps

  return (
    <div>
      <NotificationView
        {...props}
        showTime={false}
        action={
          <>
            <NotificationToastClose onClick={() => onDismiss()} />
            <NotificationGoToItem data={props.data} dismiss={onDismiss} />
          </>
        }
      />
    </div>
  )
}
