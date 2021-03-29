import React from 'react'
import { Viewable } from 'types/util'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { LayoutWithSidebar } from 'app/components/LayoutWithSidebar'
import { Filters } from 'app/pages/authorizer/components/Filters'
import { AuthorizerTable } from './AuthorizerTable'
import { FiltersToggle } from 'app/components/FiltersToggle'

export interface AuthorizerListProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
}

export const AuthorizerList = <T,>(props: AuthorizerListProps<T>) => {
  return (
    <LayoutWithSidebar
      title={props.title}
      secret
      sidebar={Filters}
      sidebarToggle={FiltersToggle}
      content={() => <AuthorizerTable {...props} />}
    />
  )
}
