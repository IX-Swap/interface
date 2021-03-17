import React from 'react'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import { ActionTableCell } from './ActionTableCell'
import { TableCellWrapper } from './TableCellWrapper'

interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
  cacheQueryKey: any
  bordered: boolean
}

export const TableRows = <T,>(props: TableRowsProps<T>): JSX.Element => {
  const {
    items,
    bordered,
    columns,
    hasActions = false,
    actions,
    cacheQueryKey
  } = props

  return (
    <TableBody>
      {items.length > 0 ? (
        items.map((row, i) => (
          <TableRow key={i}>
            {columns.map(column => (
              <TableCellWrapper
                bordered={bordered}
                key={column.key}
                column={column}
                row={row}
              />
            ))}
            {hasActions && (
              <ActionTableCell
                row={row}
                cacheQueryKey={cacheQueryKey}
                actions={actions}
              />
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
