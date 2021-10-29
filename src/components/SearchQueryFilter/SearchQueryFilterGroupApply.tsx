import React, { useContext } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { SearchQueryFilterGroupStateContext } from 'components/SearchQueryFilter/SearchQueryFilterGroup/context'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface SearchQueryFilterGroupApplyProps extends ButtonProps {}

export const SearchQueryFilterGroupApply = (
  props: SearchQueryFilterGroupApplyProps
) => {
  const { children, ...rest } = props
  const filterGroupState = useContext(SearchQueryFilterGroupStateContext)
  const { updateFilters } = useQueryFilter()

  if (filterGroupState === undefined) {
    throw new Error(
      'SearchQueryFilterGroupResetAll must be a descendant of SearchQueryFilterGroupProvider'
    )
  }

  const handleClick = () => {
    updateFilters(filterGroupState)
  }

  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  )
}
