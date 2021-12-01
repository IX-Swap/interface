import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { Dividend } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatValue } from 'app/pages/accounts/pages/reports/helper'

export interface DividendsRowProps {
  row: Dividend | any
}

export const DividendsRow = ({ row }: DividendsRowProps) => {
  const classes = useStyles({})

  return (
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
        {formatValue(row.numberOfToken)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatValue(row.totalAmount)}
      </TableCell>
    </TableRow>
  )
}
