import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { useStyles } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesTable.styles'
import { TradeConfirmationItem } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'

export interface TradesTableProps {
  data: TradeConfirmationItem[]
}

export const createRow = (pair: string) => {
  return {
    pair: pair,
    createdAt: '',
    type: '',
    quantity: '',
    price: '',
    total: '',
    fee: ''
  }
}

export const TradesTable = ({ data }: TradesTableProps) => {
  const classes = useStyles()

  const headCells = [
    { label: '', align: 'left' },
    { label: 'Date', align: 'left' },
    { label: 'Type', align: 'left' },
    { label: 'Quantity', align: 'right' },
    { label: 'Price', align: 'right' },
    { label: 'Total', align: 'right' },
    { label: 'Fee', align: 'right' }
  ]

  const rows = [createRow('Securities Pair'), ...data]

  const getRowClassName = (i: number) =>
    i === 0 ? classes.firstRow : classes.row

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
            <TableRow key={row.pair} className={getRowClassName(i)}>
              <TableCell
                component='th'
                scope='row'
                align={'left'}
                className={classes.column}
              >
                {row.pair}
              </TableCell>
              <TableCell align='left' className={classes.column}>
                {formatReportsDateAndTime(row.createdAt)}
              </TableCell>
              <TableCell align='left' className={classes.column}>
                {row.type}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {row.quantity}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.price)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.total)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.fee)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
