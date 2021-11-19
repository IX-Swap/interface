import React from 'react'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import { ActionTableCell } from './ActionTableCell'
import { TableCellWrapper } from './TableCellWrapper'
import { useTheme } from '@material-ui/core/styles'

export interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
  cacheQueryKey: any
  bordered: boolean
  themeVariant?: 'default' | 'primary' | 'no-header'
  noDataComponent: JSX.Element
}

export const TableRows = <T,>(props: TableRowsProps<T>): JSX.Element => {
  const {
    items,
    bordered,
    columns,
    hasActions = false,
    actions,
    cacheQueryKey,
    themeVariant = 'default',
    noDataComponent
  } = props

  const theme = useTheme()

  const rowColor = (count: number) => {
    return themeVariant !== 'default'
      ? count % 2 === 0 && themeVariant === 'primary'
        ? theme.palette.backgrounds.default
        : theme.palette.type === 'light'
        ? '#F8F8FD'
        : theme.palette.grey[900]
      : 'initial'
  }

  return (
    <TableBody>
      {items.length > 0 ? (
        items.map((row, i) => (
          <TableRow
            key={i}
            style={{
              backgroundColor: rowColor(i),
              border: themeVariant === 'primary' ? 'none' : 'initial',
              borderBottom:
                themeVariant === 'no-header' ? '4px solid #ffffff' : 'initial'
            }}
          >
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
            {noDataComponent}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
