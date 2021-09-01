import { Viewable } from 'types/util'
import React from 'react'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'components/TableWithPagination/TableView'
import { useAuthorizerFilter } from '../hooks/useAuthorizerFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { ActionsProps } from 'app/pages/authorizer/components/Actions'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  actions?: (actionsProps: ActionsProps<T>) => JSX.Element
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, name, uri, actions } = props
  const { filter: authFilter } = useAuthorizerFilter()
  const category = useAuthorizerCategory()

  const mergedFilters = {
    ...authFilter,
    isAssigned:
      category === 'virtual-accounts'
        ? authFilter.status !== 'Rejected'
        : undefined
  }

  return (
    <TableView<T>
      name={name}
      uri={uri}
      columns={columns}
      actions={actions ?? withExtraActions<T>()}
      filter={mergedFilters}
      hasActions
      hasStatus
    />
  )
}
