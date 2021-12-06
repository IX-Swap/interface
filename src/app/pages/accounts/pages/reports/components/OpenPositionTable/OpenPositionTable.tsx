import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { OpenPositionItem, OpenPositionsTotal } from 'types/reports'
import { OpenPositionRow } from 'app/pages/accounts/pages/reports/components/OpenPositionTable/OpenPositionRow'
import { TableCellItem } from 'types/table'

export interface OpenPositionTableProps {
  openPositions: OpenPositionItem[]
  openPositionsTotal: OpenPositionsTotal
}

export interface OpenPositionRowData {
  pair: string
  date: string
  amount: string
  price: string | number
  costValue: string
  lastTradePrice: string
  currentValue: string | number
  unrealizedPnl: string | number
}

export const OpenPositionTable = ({
  openPositions,
  openPositionsTotal
}: OpenPositionTableProps) => {
  const classes = useStyles({})

  const headCells: TableCellItem[] = [
    { label: 'Symbol', align: 'left' },
    { label: 'Open', align: 'left' },
    { label: 'Quantity', align: 'right' },
    { label: 'Cost price', align: 'right' },
    { label: 'Cost value', align: 'right' },
    { label: 'Last Trade Price', align: 'right' },
    { label: 'Current Value', align: 'right' },
    { label: 'Unrealized P/L', align: 'right' }
  ]

  const rows = [
    { pair: 'Tokens', price: '', currentValue: '', unrealizedPnl: '' },
    ...openPositions,
    {
      pair: 'Total',
      price: openPositionsTotal.totalCostPrice,
      currentValue: openPositionsTotal.totalCurrentValue,
      unrealizedPnl: openPositionsTotal.totalUnrealizedPnl
    }
  ]

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(({ label, align }) => (
              <TableCell align={align} className={classes.headColumn}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <OpenPositionRow
              row={row as OpenPositionRowData}
              index={i}
              rowsLength={rows.length}
              key={row.pair}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
