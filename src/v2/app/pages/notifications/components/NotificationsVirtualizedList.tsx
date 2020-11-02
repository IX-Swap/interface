import React from 'react'
import { VirtualizedList } from 'v2/components/VirtualizedList/VirtualizedList'
import { useNotifications } from '../hooks/useNotifications'
import { NotificationsVirtualizedItem } from './NotificationsVirtualizedItem'

export const NotificationsVirtualizedList = () => {
  const { data, isLoading } = useNotifications()

  return (
    <VirtualizedList
      itemData={data}
      itemCount={data.length}
      height={300}
      width='100%'
      itemComponent={NotificationsVirtualizedItem}
    />
  )
}
