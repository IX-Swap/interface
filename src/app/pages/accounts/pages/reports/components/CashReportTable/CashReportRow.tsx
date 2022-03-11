import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useStyles } from '../shared.styles'
import { formatAmountValue } from 'helpers/numbers'
import { CashRowData } from 'app/pages/accounts/pages/reports/components/CashReportTable/CashReportTable'

export interface CashReportRowProps {
  row: CashRowData
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
        {formatAmountValue(row.total)}
      </TableCell>
    </TableRow>
  )
}
