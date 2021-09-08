import React from 'react'
import { Viewable } from 'types/util'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { LayoutWithSidebar } from 'app/components/LayoutWithSidebar'
import { Filters } from 'app/pages/authorizer/components/Filters'
import { AuthorizerTable } from './AuthorizerTable'
import { FiltersToggle } from 'app/components/FiltersToggle'
import { SelectionHelper } from 'components/SelectionHelper'

export interface AuthorizerListProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  selectable?: boolean
  itemComparator?: (a: any, b: any) => boolean
}

export const defaultItemComparator = (a: any, b: any) => {
  return a._id === b._id
}

export const AuthorizerList = <T,>(props: AuthorizerListProps<T>) => {
  return (
    <SelectionHelper
      itemComparator={props.itemComparator ?? defaultItemComparator}
    >
      <LayoutWithSidebar
        title={props.title}
        secret
        sidebar={Filters}
        sidebarToggle={FiltersToggle}
        content={() => <AuthorizerTable {...props} />}
      />
    </SelectionHelper>
  )
}
