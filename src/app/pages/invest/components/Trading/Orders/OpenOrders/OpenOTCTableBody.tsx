import { Box, TableBody, TableCell, TableRow } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'
import { OpenOrdersEmptyState } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrdersEmptyState'
import { ActionTableCell } from 'components/TableWithPagination/ActionTableCell'
import { TableCellWrapper } from 'components/TableWithPagination/TableCellWrapper'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { getExpiresOrderMessage } from 'helpers/dates'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
import { needsConfirmation, useOpenOrderState, sortOpenOrders } from './helpers'

export const OpenOTCTableBody = (props: TableViewRendererProps<OTCOrder>) => {
  const classes = useStyles()
  const { columns, items, actions, hasActions, cacheQueryKey } = props
  const { showEmptyState, columnCount, rowColor } = useOpenOrderState(props)
  if (showEmptyState) {
    return <OpenOrdersEmptyState />
  }
  const sorted = items.sort(sortOpenOrders)

  return (
    <TableBody>
      {sorted.map((row, i) => (
        <>
          <TableRow
            key={i}
            style={{
              backgroundColor: rowColor(row),
              border: 'transparent',
              borderBottom: 'initial'
            }}
          >
            {columns.map(column => (
              <TableCellWrapper
                bordered={true}
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
          {needsConfirmation(row) && (
            <TableRow
              key={`${i}-timeout`}
              className={classes.infoRow}
              style={{
                backgroundColor: rowColor(row)
              }}
            >
              <TableCell
                align='right'
                colSpan={columnCount}
                className={classes.infoCell}
              >
                <Box className={classes.separator} />
                {getExpiresOrderMessage(new Date(row.createdAt))}
              </TableCell>
            </TableRow>
          )}
        </>
      ))}
    </TableBody>
  )
}
