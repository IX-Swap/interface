import React from 'react'
import { SidebarTitle } from 'ui/Sidebar/SidebarTitle'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'
import { useHistory } from 'react-router-dom'

export const Filters = () => {
  const { location } = useHistory()
  return (
    <>
      {location?.pathname?.includes('individuals') ||
      location?.pathname?.includes('corporates') ? (
        ''
      ) : (
        <SidebarTitle>FILTERS</SidebarTitle>
      )}

      <SidebarSection>
        <StatusFilter />
      </SidebarSection>

      <SidebarSection padded>
        <SearchAndDateFilter />
      </SidebarSection>
    </>
  )
}
