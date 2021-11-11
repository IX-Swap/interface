import { useContext, useEffect } from 'react'
import {
  QueryFilter,
  QueryFilters,
  useQueryFilter
} from 'hooks/filters/useQueryFilter'
import { Maybe } from 'types/util'
import {
  SearchQueryFilterGroupDispatchContext,
  SearchQueryFilterGroupStateContext
} from 'components/SearchQueryFilter/SearchQueryFilterGroup/context'

export interface SearchQueryFilterChildrenProps<TValue> {
  value: TValue
  hasValue: boolean
  onChange: (value: TValue) => void
  onClear: () => void
}

export interface SearchQueryFilterProps<TName extends QueryFilter> {
  name: QueryFilter
  defaultValue?: QueryFilters[TName]
  groupFilter?: boolean
  children: (
    props: SearchQueryFilterChildrenProps<QueryFilters[TName]>
  ) => Maybe<JSX.Element>
}

export const SearchQueryFilter = <TName extends QueryFilter>(
  props: SearchQueryFilterProps<TName>
) => {
  const { children, name, defaultValue, groupFilter = false } = props

  const { getFilterValue, getHasValue, updateFilter, removeFilter } =
    useQueryFilter()

  const groupFilterState = useContext(SearchQueryFilterGroupStateContext)
  const groupFilterDispatch = useContext(SearchQueryFilterGroupDispatchContext)

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      updateFilter(name, defaultValue)
    }
  }, []) // eslint-disable-line

  const searchQueryValue = getFilterValue(name)
  let value: QueryFilters[TName]
  let hasValue: boolean

  if (groupFilter) {
    if (groupFilterState === undefined) {
      throw new Error(
        'SearchQueryFilterGroupResetAll must be a descendant of SearchQueryFilterGroupProvider'
      )
    }

    value = groupFilterState[name] ?? (searchQueryValue as any) // TODO: fix any
    hasValue = value !== undefined
  } else {
    value = searchQueryValue as any // TODO: fix any
    hasValue = getHasValue(name)
  }

  const handleChange = (value: QueryFilters[TName]) => {
    if (groupFilter) {
      if (groupFilterDispatch === undefined) {
        throw new Error(
          'SearchQueryFilterGroupResetAll must be a descendant of SearchQueryFilterGroupProvider'
        )
      }

      groupFilterDispatch({
        type: 'update',
        key: name,
        value
      })
    } else {
      updateFilter(name, value)
    }
  }

  const handleClear = () => {
    removeFilter(name)
  }

  return children({
    value,
    hasValue,
    onChange: handleChange,
    onClear: handleClear
  })
}
