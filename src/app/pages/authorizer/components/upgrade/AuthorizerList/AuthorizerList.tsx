import React from 'react'
import { Viewable } from 'types/util'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { LayoutWithFilter } from 'app/components/LayoutWithFilter/LayoutWithFilter'
import { Filters } from 'app/pages/authorizer/components/Filters'
import { AuthorizerTable } from '../AuthorizerTable/AuthorizerTable'
import { SelectionHelper } from 'components/SelectionHelper'
import { AuthorizerSelectionActions } from 'app/pages/authorizer/components/SelectionAction/SelectionActions'

export interface AuthorizerListProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  selectable?: boolean
  itemComparator?: (a: any, b: any) => boolean
  selectionActions?: AuthorizerSelectionActions
}

export const defaultItemComparator = (a: any, b: any) => {
  return a._id === b._id
}

export const AuthorizerList = <T,>(props: AuthorizerListProps<T>) => {
  return (
    <SelectionHelper
      itemComparator={props.itemComparator ?? defaultItemComparator}
    >
      <LayoutWithFilter
        title={props.title}
        secret
        filter={Filters}
        content={() => <AuthorizerTable {...props} />}
      />
    </SelectionHelper>
  )
}
