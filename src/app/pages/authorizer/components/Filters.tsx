import React from 'react'
import { SidebarTitle } from 'ui/Sidebar/SidebarTitle'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'

export const Filters = ({ hideTitle = false }) => {
  return (
    <>
      {!hideTitle && <SidebarTitle>FILTERS</SidebarTitle>}

      <SidebarSection>
        <StatusFilter />
      </SidebarSection>

      <SidebarSection padded>
        <SearchAndDateFilter />
      </SidebarSection>
    </>
  )
}
