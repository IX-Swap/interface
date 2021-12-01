import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { Dividend } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'

export interface DividendsRowProps {
  row: Dividend | any
}

export const DividendsRow = ({ row }: DividendsRowProps) => {
  const classes = useStyles({})

  const valueFormatAmount = (value: string | number) =>
    typeof value === 'number' ? formatAmount(value) : value

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
        {valueFormatAmount(row.numberOfToken)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {valueFormatAmount(row.totalAmount)}
      </TableCell>
    </TableRow>
  )
}
