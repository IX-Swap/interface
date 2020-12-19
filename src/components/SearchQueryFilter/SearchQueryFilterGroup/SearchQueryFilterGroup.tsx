import React, { PropsWithChildren } from 'react'
import { SearchQueryFilterGroupProvider } from 'components/SearchQueryFilter/SearchQueryFilterGroup/context'

export interface SearchQueryFilterGroupProps extends PropsWithChildren<{}> {}

export const SearchQueryFilterGroup = (props: SearchQueryFilterGroupProps) => {
  const { children } = props

  return (
    <SearchQueryFilterGroupProvider>{children}</SearchQueryFilterGroupProvider>
  )
}
