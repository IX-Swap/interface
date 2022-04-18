import React from 'react'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { TableCellWrapper } from 'components/TableWithPagination/TableCellWrapper'
import { ActionTableCell } from 'components/TableWithPagination/ActionTableCell'
import useStyles from 'ui/UIKit/TablesKit/components/TableRows/TableRows.styles'
import { VSpacer } from 'components/VSpacer'

export interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
  cacheQueryKey: any
  bordered: boolean
  isLoading: boolean
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
    isLoading
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
            <VSpacer size={'extraSmall'} />
          </>
        ))}
      {!isLoading && !hasItems && (
        <TableRow>
          <TableCell align='center' colSpan={columns.length + +!!hasActions}>
            {noDataComponent}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
