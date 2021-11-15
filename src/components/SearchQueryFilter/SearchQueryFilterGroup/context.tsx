import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useReducer
} from 'react'
import {
  searchQueryFilterGroupReducer,
  SearchQueryFilterGroupReducerActions,
  SearchQueryFilterState
} from 'components/SearchQueryFilter/SearchQueryFilterGroup/reducer'

export const SearchQueryFilterGroupDispatchContext = createContext<
  Dispatch<SearchQueryFilterGroupReducerActions> | undefined
>(undefined)

export const SearchQueryFilterGroupStateContext = createContext<
  SearchQueryFilterState | undefined
>(undefined)

export const SearchQueryFilterGroupProvider = (
  props: PropsWithChildren<{}>
) => {
  const { children } = props
  const [state, dispatch] = useReducer(searchQueryFilterGroupReducer, {})

  return (
    <SearchQueryFilterGroupDispatchContext.Provider value={dispatch}>
      <SearchQueryFilterGroupStateContext.Provider value={state}>
        {children}
      </SearchQueryFilterGroupStateContext.Provider>
    </SearchQueryFilterGroupDispatchContext.Provider>
  )
}
