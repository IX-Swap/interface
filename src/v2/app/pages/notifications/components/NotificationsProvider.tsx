import { PropsWithChildren } from 'react'
import { useSubscribeToNotifications } from 'v2/app/pages/notifications/hooks/useSubscribeToNotifications'

export const NotificationsProvider = ({ children }: PropsWithChildren<any>) => {
  useSubscribeToNotifications()

  return children
}
