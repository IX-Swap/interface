import { Notification } from 'v2/types/notification'
import { AppFeature } from 'v2/types/app'

export const getUnreadNotificationsCount = (
  notifications: Notification[] | null | undefined
) => {
  return notifications?.filter(n => !n.read).length ?? 0
}

export const markNotificationAsRead = (
  notificationId: string,
  data: Notification[] = []
) => {
  const notificationIdx = data.findIndex(n => n._id === notificationId)

  if (notificationIdx === -1) {
    return data
  }

  return [
    ...data.slice(0, notificationIdx),
    { ...data[notificationIdx], read: true },
    ...data.slice(notificationIdx + 1)
  ]
}

export const markAllNotificationsAsRead = (data: Notification[] = []) => {
  return data.map(n => ({ ...n, read: true }))
}

export const filterNotifications = (
  filter: AppFeature[] | undefined,
  data: Notification[] = []
) => {
  if (filter === undefined) {
    return data
  }

  if (filter.length === 0) {
    return []
  }

  return data.filter(n => filter.includes(n.feature as AppFeature))
}
