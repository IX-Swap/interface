import React from 'react'
import { NotificationsFilter } from 'v2/app/pages/notifications/components/NotificationsFilter'
import { LayoutWithSidebar } from 'v2/app/components/LayoutWithSidebar'
import { Notifications } from 'v2/app/pages/notifications/components/Notifications'

export const NotificationsRoot = () => {
  return (
    <LayoutWithSidebar sidebar={NotificationsFilter} content={Notifications} />
  )
}
