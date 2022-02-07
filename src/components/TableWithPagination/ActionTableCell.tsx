import React from 'react'
import { TableCell } from '@mui/material'
import { ActionsType } from 'app/pages/authorizer/components/Actions'

export interface ActionTableCellProps<T> {
  row: T
  cacheQueryKey: any
  actions: ActionsType<T> | undefined
}

export const ActionTableCell = <T,>({
  row,
  cacheQueryKey,
  actions
}: ActionTableCellProps<T>) => (
  <TableCell align='right'>
    {actions?.({ item: row, cacheQueryKey }) ?? null}
  </TableCell>
)
