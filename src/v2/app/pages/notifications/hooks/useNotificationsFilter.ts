import { useServices } from 'v2/hooks/useServices'
import { useEffect, useState } from 'react'
import { NotificationFilter } from 'v2/types/app'
import { queryCache } from 'react-query'

export const defaultNotificationFilter = Object.values(NotificationFilter)

export const useNotificationsFilter = () => {
  const { storageService } = useServices()
  const [filter, setFilter] = useState<NotificationFilter[]>(
    defaultNotificationFilter
  )
  const handleClick = (value: NotificationFilter) => {
    setFilter(f => {
      const nextFilter = f.includes(value)
        ? f.filter(v => v !== value)
        : [...f, value]

      storageService.set('notificationFilter', nextFilter)
      void queryCache.invalidateQueries('notifications')

      return nextFilter
    })
  }

  useEffect(() => {
    const savedFilters = storageService.get<NotificationFilter[]>(
      'notificationFilter'
    )
    setFilter(savedFilters ?? defaultNotificationFilter)
  }, []) //eslint-disable-line

  return {
    filter,
    handleClick
  }
}
