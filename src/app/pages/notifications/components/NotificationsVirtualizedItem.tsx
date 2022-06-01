import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { useVirtualizedListItemHelpers } from 'components/VirtualizedList/hooks/useVirtualizedListHelpers'
import { MarkAsRead } from './MarkAsRead'
import { NotificationView } from './NotificationView'

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
      <div ref={ref} style={{ marginBottom: -1 }}>
        <NotificationView data={item} action={<MarkAsRead data={item} />} />
      </div>
    </div>
  )
}
