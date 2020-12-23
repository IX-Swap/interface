import React from 'react'
import { BaseFilter } from 'types/util'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'
import { useQueryCache } from 'react-query'
import { authorizerQueryKeys } from 'config/queryKeys'
import { SidebarTitle } from 'ui/Sidebar/SidebarTitle'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'

export const Filters = () => {
  const queryCache = useQueryCache()
  const onApplyFilter = (filterPart: Partial<BaseFilter>) => {
    queryCache.setQueryData<BaseFilter>(
      authorizerQueryKeys.authorizerFilter,
      filter => ({
        ...filter,
        ...filterPart
      })
    )
    // TODO: invalidate only current table
    void queryCache.invalidateQueries()
    void queryCache.refetchQueries()
  }

  return (
    <>
      <SidebarTitle>FILTERS</SidebarTitle>

      <SidebarSection>
        <StatusFilter onChange={onApplyFilter} />
      </SidebarSection>

      <SidebarSection padded>
        <SearchAndDateFilter onApplyFilter={onApplyFilter} />
      </SidebarSection>
    </>
  )
}
