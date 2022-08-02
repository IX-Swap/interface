import { TableBody, TableCell, TableRow } from '@mui/material'
import { ActionTableCell } from 'components/TableWithPagination/ActionTableCell'
import { TableCellWrapper } from 'components/TableWithPagination/TableCellWrapper'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import React from 'react'
import useStyles from 'ui/UIKit/TablesKit/components/TableRows/TableRows.styles'

export interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
  cacheQueryKey: any
  bordered: boolean
  isLoading: boolean
  activeSortLabel?: string
}

export const TableRows = <T,>(props: TableRowsProps<T>): JSX.Element => {
  const {
    items,
    bordered,
    columns,
    hasActions = false,
    actions,
    cacheQueryKey,
    noDataComponent,
    size,
    isLoading,
    activeSortLabel
  } = props

  const classes = useStyles({ size })

  const hasItems = !(items.length === 0)

  return (
    <TableBody>
      {hasItems &&
        items.map((row, i) => (
          <>
            <TableRow key={i} className={classes.wrapper}>
              {columns.map(column => (
                <TableCellWrapper
                  isAllocated={activeSortLabel === column.key}
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
          </>
        ))}
      {!isLoading && !hasItems && (
        <TableRow>
          <TableCell
            sx={{ padding: 0 }}
            align='center'
            colSpan={columns.length + +!!hasActions}
          >
            {noDataComponent}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
