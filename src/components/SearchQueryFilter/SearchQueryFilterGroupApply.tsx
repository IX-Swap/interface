import React, { useContext } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { SearchQueryFilterGroupStateContext } from 'components/SearchQueryFilter/SearchQueryFilterGroup/context'
import { QueryFilter, useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface SearchQueryFilterGroupApplyProps extends ButtonProps {
  filters: QueryFilter[]
}

export const SearchQueryFilterGroupApply = (
  props: SearchQueryFilterGroupApplyProps
) => {
  const { filters, children, ...rest } = props
  const filterGroupState = useContext(SearchQueryFilterGroupStateContext)
  const { updateFilters, getHasValue } = useQueryFilter()

  if (filterGroupState === undefined) {
    throw new Error(
      'SearchQueryFilterGroupResetAll must be a descendant of SearchQueryFilterGroupProvider'
    )
  }

  const hasValues = filters.some(filter => getHasValue(filter))

  const handleClick = () => {
    updateFilters(filterGroupState)
  }

  return !hasValues ? (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  ) : null
}
