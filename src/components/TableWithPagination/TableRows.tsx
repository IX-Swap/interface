import React from 'react'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import get from 'lodash/get'
import { privateClassNames } from 'helpers/classnames'

interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
  cacheQueryKey: any
}

export const TableRows = <T,>(props: TableRowsProps<T>): JSX.Element => {
  const { items, columns, hasActions = false, actions, cacheQueryKey } = props

  return (
    <TableBody>
      {items.length > 0 ? (
        items.map((row, i) => (
          <TableRow hover key={i}>
            {columns.map(column => (
              <TableCell
                align={column.align ?? 'left'}
                key={`row-${column.key}`}
                className={column.secret === true ? privateClassNames() : ''}
              >
                {column.key.length > 0 &&
                  (typeof column.render === 'function'
                    ? column.render(get(row, column.key), row)
                    : get(row, column.key))}
              </TableCell>
            ))}
            {hasActions && (
              <TableCell align='center'>
                {actions?.({ item: row, cacheQueryKey }) ?? null}
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
