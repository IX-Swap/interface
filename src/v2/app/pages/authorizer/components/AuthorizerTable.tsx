import { Viewable } from 'v2/types/util'
import React from 'react'
import { Paper } from '@material-ui/core'
import { statusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { withExtraActions } from 'v2/app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'v2/components/TableWithPagination/TableView'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  isAll: boolean
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, name, uri, isAll } = props

  return (
    <Paper>
      <TableView<T>
        name={name}
        uri={uri}
        columns={isAll ? [...columns, statusColumn] : columns}
        actions={withExtraActions<T>()}
        hasActions
      />
    </Paper>
  )
}
