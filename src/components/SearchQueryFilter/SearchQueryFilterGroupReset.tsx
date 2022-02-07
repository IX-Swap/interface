import { Button, ButtonProps } from '@mui/material'
import { SearchQueryFilterGroupDispatchContext } from 'components/SearchQueryFilter/SearchQueryFilterGroup/context'
import { QueryFilter, useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useContext } from 'react'

export interface SearchQueryFilterGroupResetProps extends ButtonProps {
  filters: QueryFilter[]
}

export const SearchQueryFilterGroupReset = (
  props: SearchQueryFilterGroupResetProps
) => {
  const { filters, children, ...rest } = props
  const filterGroupDispatch = useContext(SearchQueryFilterGroupDispatchContext)
  const { removeFilters, getHasValue } = useQueryFilter()

  if (filterGroupDispatch === undefined) {
    throw new Error(
      'SearchQueryFilterGroupResetAll must be a descendant of SearchQueryFilterGroupProvider'
    )
  }

  const hasValues = filters.some(filter => getHasValue(filter))

  const resetFilterState = () => {
    filterGroupDispatch({
      type: 'clear-all'
    })

    removeFilters(filters)
  }

  return hasValues ? (
    <Button {...rest} onClick={resetFilterState}>
      {children}
    </Button>
  ) : null
}
