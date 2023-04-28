import React from 'react'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { StatusFilter } from './StatusFilter'
import { SearchAndDateFilter } from './SearchAndDateFilter'

export const Filters = () => {
  return (
    <>
      <SidebarSection>
        <StatusFilter />
      </SidebarSection>

      <SidebarSection padded>
        <SearchAndDateFilter />
      </SidebarSection>
    </>
  )
}
