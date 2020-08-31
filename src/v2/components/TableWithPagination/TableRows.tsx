import React from 'react'
import { TableViewProps } from 'v2/components/TableWithPagination/TableView'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import { get } from 'lodash'

interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
}

export const TableRows = <T,>({
  items,
  columns,
  hasActions = false,
  actions
}: TableRowsProps<T>): JSX.Element => {
  return (
    <TableBody>
      {items.length > 0 ? (
        items.map((row, i) => (
          <TableRow hover key={i}>
            {columns.map(column => (
              <TableCell
                align={column.align ?? 'left'}
                key={`row-${column.key}`}
              >
                {column.key.length > 0 &&
                  (typeof column.render === 'function'
                    ? column.render(get(row, column.key), row)
                    : get(row, column.key))}
              </TableCell>
            ))}
            {hasActions && (
              <TableCell align='center'>
                {actions?.({ item: row }) ?? null}
              </TableCell>
            )}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell align='center' colSpan={columns.length + +!!hasActions}>
            No Data
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
