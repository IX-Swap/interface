import React from 'react'
import { TableViewProps } from 'components/TableWithPagination/TableView'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { ActionTableCell } from './ActionTableCell'
import { TableCellWrapper } from './TableCellWrapper'
import { useTheme } from '@mui/material/styles'
import { getRowColor } from 'helpers/tables'
import { ThemeVariant } from '@mui/material/styles/overrides'

export interface TableRowsProps<T> extends TableViewProps<T> {
  items: T[]
  cacheQueryKey: any
  bordered: boolean
  isLoading: boolean
  themeVariant?: ThemeVariant
  noHeader?: boolean
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
    noHeader = false,
    noDataComponent,
    isLoading
  } = props

  const theme = useTheme()

  const rowColor = (count: number) =>
    getRowColor({ theme, count, themeVariant })

  const hasItems = !(items.length === 0)

  return (
    <TableBody>
      {hasItems &&
        items.map((row, i) => (
          <TableRow
            key={i}
            style={{
              backgroundColor: rowColor(i),
              border: themeVariant === 'primary' ? 'none' : 'initial',
              borderBottom:
                noHeader && themeVariant === 'default'
                  ? '4px solid #ffffff'
                  : 'initial'
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
