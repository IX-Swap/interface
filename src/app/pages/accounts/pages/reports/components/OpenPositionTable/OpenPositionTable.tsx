import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { useStyles } from './OpenPositionTable.styles'
import { OpenPositionItem, OpenPositionsTotal } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount, formatDecimal } from 'helpers/numbers'

export interface OpenPositionTableProps {
  openPositions: OpenPositionItem[]
  openPositionsTotal: OpenPositionsTotal
}

export const createRow = (
  pairName: string,
  price: string | number,
  currentValue: string | number
) => {
  return {
    pair: { name: pairName },
    createdAt: '',
    amount: '',
    price,
    costValue: '',
    lastTradePrice: '',
    currentValue,
    unrealizedPnl: ''
  }
}

export const OpenPositionTable = ({
  openPositions,
  openPositionsTotal
}: OpenPositionTableProps) => {
  const classes = useStyles()

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
    createRow('Tokens', '', ''),
    ...openPositions,
    createRow(
      'Total',
      openPositionsTotal.totalCostPrice,
      openPositionsTotal.totalCurrentValue
    )
  ]

  const getRowClassName = (i: number, length: number) => {
    switch (i) {
      case 0:
        return classes.firstRow
      case length:
        return classes.lastRow
      default:
        return classes.row
    }
  }

  const valueFormatAmount = (value: string | number) =>
    typeof value === 'number' ? formatAmount(value) : value

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
            <TableRow
              key={row.pair.name}
              className={getRowClassName(i, rows.length - 1)}
            >
              <TableCell component='th' scope='row' className={classes.column}>
                {row.pair.name}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {formatReportsDateAndTime(row.createdAt)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {row.amount}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.price)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.costValue)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.lastTradePrice)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.currentValue)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.unrealizedPnl)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
