import { useQuery, useQueryCache } from 'react-query'
import {
  filterNotifications,
  getUnreadNotificationsCount
} from 'app/pages/notifications/hooks/utils'
import { Notification } from 'types/notification'
import { AppFeature } from 'types/app'
import { useServices } from 'hooks/useServices'
import { queryKeys } from 'config/queryKeys'

export const useNotifications = (filterByFeature = false) => {
  const { storageService } = useServices()
  const queryCache = useQueryCache()
  const filter = storageService.get<AppFeature[]>('notificationFilter')
  const { data = [], ...rest } = useQuery(queryKeys.notifications, () => {
    return queryCache.getQueryData<Notification[]>(queryKeys.notifications)
  })
  const filtered = filterByFeature ? filterNotifications(filter, data) : data
  const unreadCount = getUnreadNotificationsCount(filtered)

  return {
    ...rest,
    data: filtered,
    unreadCount
  }
}
