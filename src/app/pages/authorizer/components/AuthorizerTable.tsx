import { Viewable } from 'types/util'
import React from 'react'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'components/TableWithPagination/TableView'
import { useAuthorizerFilter } from '../hooks/useAuthorizerFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  themeVariant?: 'default' | 'primary' | 'no-header'
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, name, uri, themeVariant = 'primary' } = props
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
      actions={withExtraActions<T>()}
      filter={mergedFilters}
      hasActions
      hasStatus
      themeVariant={themeVariant}
    />
  )
}
