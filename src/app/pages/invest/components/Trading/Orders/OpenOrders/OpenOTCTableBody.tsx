import { TableBody, TableCell, TableRow } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'
import { OpenOrdersEmptyState } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrdersEmptyState'
import { TableCellWrapper } from 'components/TableWithPagination/TableCellWrapper'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { getExpiresOrderMessage } from 'helpers/dates'
import React, { useContext } from 'react'
import { OTCOrder } from 'types/otcOrder'
import { OpenOrdersContext } from '../../context/OpenOrdersContextWrapper'
import { needsConfirmation, sortOpenOrders, useOpenOrderState } from './helpers'
import { ActionTableCell } from 'components/TableWithPagination/ActionTableCell'

export const OpenOTCTableBody = (props: TableViewRendererProps<OTCOrder>) => {
  const classes = useStyles()
  const theme = useTheme()
  const { columns, items, actions, hasActions, cacheQueryKey } = props
  const { showEmptyState, columnCount, rowColor } = useOpenOrderState(props)
  const context = useContext(OpenOrdersContext)

  if (showEmptyState) {
    return <OpenOrdersEmptyState />
  }
  const sorted = items?.sort(sortOpenOrders) ?? []

  return (
    <TableBody>
      {sorted.map((row, i) => (
        <>
          <TableRow
            key={i}
            style={{
              backgroundColor: rowColor(row),
              border: 'transparent',
              borderBottom:
                needsConfirmation(row) || i === sorted.length - 1
                  ? 'initial'
                  : `12px solid ${theme.palette.background.paper}`
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
          {context?.isIndexOpen(row._id) === true && (
            <TableRow
              key={`${i}-subrow`}
              style={{
                border: 'transparent'
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
          )}
          {needsConfirmation(row) && (
            <TableRow
              key={`${i}-timeout`}
              className={classes.infoRow}
              style={{
                backgroundColor: rowColor(row),
                borderBottom: `12px solid ${theme.palette.background.paper}`
              }}
            >
              <TableCell
                align='right'
                colSpan={columnCount}
                className={classes.infoCell}
              >
                {getExpiresOrderMessage(new Date(row.createdAt))}
              </TableCell>
            </TableRow>
          )}
        </>
      ))}
    </TableBody>
  )
}
