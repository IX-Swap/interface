import { TableBody, TableCell, TableRow } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'
import { OpenOrdersEmptyState } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrdersEmptyState'
import { ActionTableCell } from 'components/TableWithPagination/ActionTableCell'
import { TableCellWrapper } from 'components/TableWithPagination/TableCellWrapper'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { getExpiresOrderMessage } from 'helpers/dates'
import React, { useContext } from 'react'
import { OpenOTCOrder, OTCMatch } from 'types/otcOrder'
import { OpenOrdersContext } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
import { nestedcolumns } from './columns'
import {
  getColumnMatchedOrder,
  needsConfirmation,
  useOpenOrderState
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { ConfirmOTCOrderActions } from './OTCOrderActions'

export const OpenOTCTableBody = (
  props: TableViewRendererProps<OpenOTCOrder>
) => {
  const classes = useStyles()
  const theme = useTheme()
  const { columns, items: sorted, actions, hasActions, cacheQueryKey } = props
  const { showEmptyState, columnCount, rowColor } = useOpenOrderState(props)
  const context = useContext(OpenOrdersContext)

  if (showEmptyState) {
    return <OpenOrdersEmptyState />
  }
  // const sorted = items?.sort(sortOpenOrders) ?? []
  const renderMatches = (row: OpenOTCOrder) => (
    <>
      {row?.matches?.map((match: OTCMatch) => (
        <TableRow
          key={`${match._id}-child`}
          style={{
            border: 'transparent'
          }}
        >
          {nestedcolumns.map(column => (
            <TableCellWrapper
              bordered={true}
              key={column.key}
              column={column}
              row={getColumnMatchedOrder(row, match)}
            />
          ))}

          {hasActions && (
            <TableCell align='right'>
              <ConfirmOTCOrderActions
                item={getColumnMatchedOrder(row, match)}
              />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  )

  return (
    <>
      <TableBody>
        {sorted.map((row, i) => (
          <>
            <TableRow
              key={row._id}
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
            {context?.isIndexOpen(row._id) === true &&
              row?.matches &&
              row?.matches?.length > 0 && <>{renderMatches(row)}</>}
            {needsConfirmation(row) && (
              <TableRow
                key={`${row._id}-timeout`}
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
    </>
  )
}
