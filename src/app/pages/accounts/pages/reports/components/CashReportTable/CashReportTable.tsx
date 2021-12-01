import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { CashReports } from 'types/reports'
import { formatAmount } from 'helpers/numbers'

export interface CashReportTableProps {
  data: CashReports[]
}

export enum CashReportLabels {
  startingCash = 'Starting cash',
  fees = 'Other Fees',
  withdrawals = 'Withdrawals',
  endingCash = 'Ending Cash'
}

export const createRow = (currency: string, total: string) => {
  return {
    currency,
    total
  }
}

export const CashReportTable = ({ data }: CashReportTableProps) => {
  const classes = useStyles()

  const rows = [
    ...data.map(({ currency, _id, ...item }) => [
      createRow(currency, 'Total'),
      ...Object.entries(item).map(([key, value]) =>
        // @ts-ignore
        createRow(CashReportLabels[key], value)
      )
    ])
  ]

  const getRowClassName = (i: number) => {
    switch (i) {
      case 0:
        return classes.firstRow
      default:
        return classes.row
    }
  }

  const getColumnClassName = (i: number) => {
    switch (i) {
      case 2:
        return classes.spacedColumn
      case 3:
        return classes.spacedColumn
      default:
        return classes.column
    }
  }

  const valueFormatAmount = (value: string | number) =>
    typeof value === 'number' ? formatAmount(value) : value

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {rows.map(item =>
            item.map((row, i) => (
              <TableRow key={row.total} className={getRowClassName(i)}>
                <TableCell
                  component='th'
                  scope='row'
                  align={'left'}
                  className={getColumnClassName(i)}
                >
                  {row.currency}
                </TableCell>
                <TableCell
                  component='th'
                  scope='row'
                  align={'right'}
                  className={getColumnClassName(i)}
                >
                  {valueFormatAmount(row.total)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
