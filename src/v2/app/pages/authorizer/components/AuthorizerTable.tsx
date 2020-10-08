import { Viewable } from 'v2/types/util'
import React from 'react'
import { Paper } from '@material-ui/core'
import { Preview } from 'v2/app/pages/authorizer/components/Preview'
import { useAuthorizerView } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
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
}

export const AuthorizerTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const { columns, idKey, name, renderView, uri } = props
  const { filter, isViewing, item, setItem, getColumns } = useAuthorizerView<T>(
    { idKey, uri, columns }
  )

  if (isViewing && typeof renderView === 'function' && item !== undefined) {
    return <Preview onBack={setItem}>{renderView(item)}</Preview>
  }

  return (
    <Paper>
      <TableView<T>
        name={name}
        uri={uri}
        columns={getColumns()}
        filter={filter}
        actions={withExtraActions<T>({ onView: setItem })}
        hasActions
      />
    </Paper>
  )
}
