import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { useStyles } from 'app/pages/accounts/pages/reports/components/FeesTable/FeesTable.styles'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import { Account } from 'types/reports'

export interface FeesTableProps {
  accounts: Account[]
  total: number
}

export const createRow = (
  createdAt: string,
  description: string,
  amount: number | string
) => {
  return {
    createdAt,
    description,
    amount: amount
  }
}

export const FeesTable = ({ accounts, total }: FeesTableProps) => {
  const classes = useStyles()

  const headCells = [
    { label: 'Date', align: 'left' },
    { label: 'Description', align: 'center' },
    { label: 'Amount', align: 'left' }
  ]

  const rows = [
    // TODO Add other fees amount after complete backend api
    createRow('', 'Other Fees', ''),
    ...accounts,
    createRow('Total', '', total)
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
              key={row.createdAt}
              className={getRowClassName(i, rows.length - 1)}
            >
              <TableCell component='th' scope='row' className={classes.column}>
                {formatReportsDateAndTime(row.createdAt)}
              </TableCell>
              <TableCell align='left' className={classes.column}>
                {row.description}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
