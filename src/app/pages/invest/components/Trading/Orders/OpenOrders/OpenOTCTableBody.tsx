import { Box, TableBody, TableCell, TableRow, useTheme } from '@mui/material'
import { ActionTableCell } from 'components/TableWithPagination/ActionTableCell'
import { TableCellWrapper } from 'components/TableWithPagination/TableCellWrapper'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import React from 'react'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { getExpiresOrderMessage } from 'helpers/dates'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'

export const OpenOTCTableBody = (props: TableViewRendererProps<OTCOrder>) => {
  const { columns, items, actions, hasActions, cacheQueryKey } = props
  const classes = useStyles()
  const needsConfirmation = (item: OTCOrder) => {
    return (
      item.matches?.status === OTCOrderStatus.CONFIRMED &&
      item.orderType === 'SELL'
    )
  }

  const theme = useTheme()
  const rowColor = (item: OTCOrder) => {
    if (!needsConfirmation(item)) {
      return 'initial'
    }
    return theme.palette.mode === 'light' ? '#F6F4FD' : '#494166'
  }
  const columnCount = columns.length + Number(hasActions)
  return (
    <TableBody>
      {items.map((row, i) => (
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
