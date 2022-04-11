import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { NotificationView } from 'app/components/Header/components/Notifications/NotificationView/NotificationView'
import { useVirtualizedListItemHelpers } from 'app/components/Header/components/Notifications/VirtualizedList/hooks/useVirtualizedListHelpers'

export interface NotificationsVirtualizedItemProps
  extends ListChildComponentProps {}

export const NotificationsVirtualizedItem = (
  props: NotificationsVirtualizedItemProps
) => {
  const { data, index, ...rest } = props
  const { ref } = useVirtualizedListItemHelpers(index, 0)
  const item = data[index]

  return (
    <div {...rest}>
      <div ref={ref}>
        <NotificationView data={item} />
      </div>
    </div>
  )
}
