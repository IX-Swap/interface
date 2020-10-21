import { BaseFilter, Viewable } from 'v2/types/util'
import React from 'react'
import { Paper } from '@material-ui/core'
import {
  initialFilterValue,
  statusColumn
} from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { withExtraActions } from 'v2/app/pages/authorizer/components/withExtraActions'
import {
  TableView,
  TableViewProps
} from 'v2/components/TableWithPagination/TableView'
import { queryCache } from 'react-query'

interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
}

queryCache.setQueryData<BaseFilter>('authorizerFilter', initialFilterValue)

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, name, uri } = props
  const filter = queryCache.getQueryData<BaseFilter>('authorizerFilter')
  const isAll = filter?.status === ''

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
