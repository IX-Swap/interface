import { Viewable } from 'types/util'
import React from 'react'
import { withExtraActions } from 'app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'components/TableWithPagination/TableView'
import { useAuthorizerFilter } from '../hooks/useAuthorizerFilter'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, name, uri } = props
  const { filter } = useAuthorizerFilter()

  return (
    <TableView<T>
      name={name}
      uri={uri}
      columns={columns}
      actions={withExtraActions<T>()}
      filter={filter as any}
      hasActions
      hasStatus
    />
  )
}
