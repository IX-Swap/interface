import React from 'react'
import { NotificationsFilter } from 'app/pages/notifications/components/NotificationsFilter'
import { LayoutWithSidebar } from 'app/components/LayoutWithSidebar'
import { Notifications } from 'app/pages/notifications/components/Notifications'
import { FiltersToggle } from 'app/components/FiltersToggle'

export const NotificationsRoot = () => {
  return (
    <LayoutWithSidebar
      title='Notifications'
      sidebar={NotificationsFilter}
      sidebarToggle={FiltersToggle}
      content={Notifications}
    />
  )
}
