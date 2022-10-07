/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TableCell } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import get from 'lodash/get'
import React from 'react'
import { TableColumn } from 'types/util'

export interface TableCellsProps<T> {
  column: TableColumn<T>
  bordered: boolean
  row: any
  isAllocated?: boolean
}

export const TableCellWrapper = <T,>({
  column,
  row,
  bordered,
  isAllocated = false
}: TableCellsProps<T>) => {
  return (
    <TableCell
      align={column.align ?? 'left'}
      key={`row-${column.key}`}
      className={column.secret === true ? privateClassNames() : ''}
      sx={theme => ({
        border: bordered ? undefined : 'none',
        padding: bordered ? undefined : 0,
        backgroundColor: isAllocated
          ? 'rgba(76, 136, 255, 0.08)!important'
          : `${theme.palette.background.paper}!important`
      })}
    >
      {column.key.length > 0 &&
        (typeof column.render === 'function'
          ? column.render(get(row, column.key), row)
          : column.key.constructor.name === 'Array'
          ? `${get(row, column.key[0].split(',')[0])}/${get(
              row,
              column.key[0].split(',')[1]
            )}`
          : get(row, column.key))}
    </TableCell>
  )
}
