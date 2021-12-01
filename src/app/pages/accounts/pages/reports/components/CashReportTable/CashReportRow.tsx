import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { CashReports } from 'types/reports'
import { formatAmount } from 'helpers/numbers'

export interface CashReportRowProps {
  row: CashReports | any
  index: number
}

export const CashReportRow = ({ row, index }: CashReportRowProps) => {
  const classes = useStyles({ rowIdx: index })

  const valueFormatAmount = (value: string | number) =>
    typeof value === 'number' ? formatAmount(value) : value

  return (
    <TableRow key={row.total} className={classes.row}>
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        className={classes.cashColumn}
      >
        {row.currency}
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        align={'right'}
        className={classes.cashColumn}
      >
        {valueFormatAmount(row.total)}
      </TableCell>
    </TableRow>
  )
}
