import { useServices } from 'hooks/useServices'
import { useEffect, useState } from 'react'
import { NotificationFilter } from 'types/app'
import { useQueryCache } from 'react-query'
import { queryKeys } from 'config/queryKeys'

export const defaultNotificationFilter = Object.values(NotificationFilter)

export const useNotificationsFilter = () => {
  const { storageService } = useServices()
  const queryCache = useQueryCache()
  const [filter, setFilter] = useState<NotificationFilter[]>(
    defaultNotificationFilter
  )
  const handleClick = (value: NotificationFilter) => {
    setFilter(f => {
      const nextFilter = f.includes(value)
        ? f.filter(v => v !== value)
        : [...f, value]

      storageService.set('notificationFilter', nextFilter)
      void queryCache.invalidateQueries(queryKeys.notifications)

      return nextFilter
    })
  }

  useEffect(() => {
    const savedFilters =
      storageService.get<NotificationFilter[]>('notificationFilter')
    setFilter(savedFilters ?? defaultNotificationFilter)
  }, []) //eslint-disable-line

  return {
    filter,
    handleClick
  }
}
