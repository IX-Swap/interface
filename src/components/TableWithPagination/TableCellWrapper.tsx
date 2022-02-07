import React from 'react'
import { TableCell } from '@mui/material'
import get from 'lodash/get'
import { privateClassNames } from 'helpers/classnames'
import { TableColumn } from 'types/util'

export interface TableCellsProps<T> {
  column: TableColumn<T>
  bordered: boolean
  row: any
}

export const TableCellWrapper = <T,>({
  column,
  row,
  bordered
}: TableCellsProps<T>) => (
  <TableCell
    align={column.align ?? 'left'}
    key={`row-${column.key}`}
    className={column.secret === true ? privateClassNames() : ''}
    style={{
      border: bordered ? undefined : 'none',
      padding: bordered ? undefined : 0
    }}
  >
    {column.key.length > 0 &&
      (typeof column.render === 'function'
        ? column.render(get(row, column.key), row)
        : get(row, column.key))}
  </TableCell>
)
