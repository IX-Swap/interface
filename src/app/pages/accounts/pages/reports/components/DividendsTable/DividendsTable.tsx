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
import { Dividend } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'

export interface DividendsTableProps {
  data: Dividend[]
}

export const DividendsTable = ({ data }: DividendsTableProps) => {
  const classes = useStyles()

  const headCells = [
    { label: 'Date', align: 'left' },
    { label: 'Token', align: 'left' },
    { label: 'Dividend Per Share', align: 'left' },
    { label: 'Number of Token', align: 'left' },
    { label: 'Total Amount', align: 'right' }
  ]

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
          {data.map((row, i) => (
            <TableRow key={row.createdAt} className={classes.row}>
              <TableCell component='th' scope='row' className={classes.column}>
                {formatReportsDateAndTime(row.createdAt)}
              </TableCell>
              <TableCell align='left' className={classes.column}>
                {row.tokenSymbol}
              </TableCell>
              <TableCell align='left' className={classes.column}>
                {row.dividendPerShare}
              </TableCell>
              <TableCell align='left' className={classes.column}>
                {valueFormatAmount(row.numberOfToken)}
              </TableCell>
              <TableCell align='right' className={classes.column}>
                {valueFormatAmount(row.totalAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
