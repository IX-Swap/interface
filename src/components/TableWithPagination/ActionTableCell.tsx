import React from 'react'
import { TableCell } from '@material-ui/core'
import { Actions } from 'app/pages/authorizer/components/Actions'

export interface ActionTableCellProps<T> {
  row: T
  cacheQueryKey: any
  actions: Actions<T> | undefined
}

export const ActionTableCell = <T,>({
  row,
  cacheQueryKey,
  actions
}: ActionTableCellProps<T>) => (
  <TableCell align='center'>
    {actions?.({ item: row, cacheQueryKey }) ?? null}
  </TableCell>
)
