import React from 'react'
import { SidebarTitle } from 'ui/Sidebar/SidebarTitle'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import {
  ColorStatusFilter,
  StatusFilter
} from 'app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'

export interface FiltersProps {
  isNewTheme?: boolean
}

export const Filters = ({ isNewTheme = false }: FiltersProps) => {
  return (
    <>
      <SidebarTitle>FILTERS</SidebarTitle>

      <SidebarSection>
        {isNewTheme ? <ColorStatusFilter /> : <StatusFilter />}
      </SidebarSection>

      <SidebarSection padded>
        <SearchAndDateFilter />
      </SidebarSection>
    </>
  )
}
