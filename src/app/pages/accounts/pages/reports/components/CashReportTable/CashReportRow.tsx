import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { CashReports } from 'types/reports'
import { formatValue } from 'app/pages/accounts/pages/reports/helper'

export interface CashReportRowProps {
  row: CashReports | any
  index: number
}

export const CashReportRow = ({ row, index }: CashReportRowProps) => {
  const classes = useStyles({ rowIdx: index })

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
        {formatValue(row.total)}
      </TableCell>
    </TableRow>
  )
}
