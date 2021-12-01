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

export interface OpenPositionTableProps {
  openPositions: OpenPositionItem[]
  openPositionsTotal: OpenPositionsTotal
}

export const createRow = (
  pair: string,
  price: string | number,
  currentValue: string | number,
  unrealizedPnl: string | number
) => {
  return {
    pair: pair,
    date: '',
    amount: '',
    price,
    costValue: '',
    lastTradePrice: '',
    currentValue,
    unrealizedPnl
  }
}

export const OpenPositionTable = ({
  openPositions,
  openPositionsTotal
}: OpenPositionTableProps) => {
  const classes = useStyles({})

  const headCells = [
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
    createRow('Tokens', '', '', ''),
    ...openPositions,
    createRow(
      'Total',
      openPositionsTotal.totalCostPrice,
      openPositionsTotal.totalCurrentValue,
      openPositionsTotal.totalUnrealizedPnl
    )
  ]

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(({ label, align }) => (
              <TableCell align={align as any} className={classes.headColumn}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <OpenPositionRow
              row={row}
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
