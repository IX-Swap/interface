import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import { Account } from 'types/reports'

export interface FeesRowProps {
  rowsLength: number
  row: Account | any
  index: number
}

export const FeesRow = ({ row, rowsLength, index }: FeesRowProps) => {
  const classes = useStyles({ rowIdx: index, rowsLength: rowsLength })

  const valueFormatAmount = (value: string | number) =>
    typeof value === 'number' ? formatAmount(value) : value

  return (
    <TableRow key={row.createdAt} className={classes.row}>
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
  )
}
