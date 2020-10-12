import { useServices } from 'v2/services/useServices'
import { useEffect, useState } from 'react'
import { AppFeature } from 'v2/types/app'
import { queryCache } from 'react-query'

export const defaultNotificationFilter = Object.values(AppFeature)

export const useNotificationsFilter = () => {
  const { storageService } = useServices()
  const [filter, setFilter] = useState<AppFeature[]>(defaultNotificationFilter)
  const handleClick = (value: AppFeature) => {
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
    const savedFilters = storageService.get<AppFeature[]>('notificationFilter')
    setFilter(savedFilters ?? defaultNotificationFilter)
  }, []) //eslint-disable-line

  return {
    filter,
    handleClick
  }
}
