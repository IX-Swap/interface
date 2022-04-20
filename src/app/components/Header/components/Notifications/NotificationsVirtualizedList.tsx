import React from 'react'
import { VirtualizedList } from 'app/components/Header/components/Notifications/VirtualizedList/VirtualizedList'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'
import { NotificationsVirtualizedItem } from 'app/components/Header/components/Notifications/NotificationsVirtualizedItem'

export const NotificationsVirtualizedList = () => {
  const { data } = useNotifications()

  return (
    <VirtualizedList
      itemData={data}
      itemCount={data.length}
      width='100%'
      itemComponent={NotificationsVirtualizedItem}
    />
  )
}
