import React from 'react'
import { NotificationsFilter } from 'app/pages/notifications/components/NotificationsFilter'
import { LayoutWithSidebar } from 'app/components/LayoutWithSidebar'
import { Notifications } from 'app/pages/notifications/components/Notifications'

export const NotificationsRoot = () => {
  return (
    <LayoutWithSidebar sidebar={NotificationsFilter} content={Notifications} />
  )
}
