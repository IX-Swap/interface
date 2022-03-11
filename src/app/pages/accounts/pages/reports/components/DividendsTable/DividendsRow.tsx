import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useStyles } from '../shared.styles'
import { Dividend } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmountValue } from 'helpers/numbers'

export interface DividendsRowProps {
  row: Dividend
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
        {formatAmountValue(row.numberOfToken)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.totalAmount)}
      </TableCell>
    </TableRow>
  )
}
