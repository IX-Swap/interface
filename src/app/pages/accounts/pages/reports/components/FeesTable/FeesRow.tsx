import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { formatReportsDateAndTime } from 'helpers/dates'
import { Account } from 'types/reports'
import { formatValue } from 'app/pages/accounts/pages/reports/helper'

export interface FeesRowProps {
  rowsLength: number
  row: Account | any
  index: number
}

export const FeesRow = ({ row, rowsLength, index }: FeesRowProps) => {
  const classes = useStyles({ rowIdx: index, rowsLength: rowsLength })

  return (
    <TableRow key={row.createdAt} className={classes.row}>
      <TableCell component='th' scope='row' className={classes.column}>
        {formatReportsDateAndTime(row.createdAt)}
      </TableCell>
      <TableCell align='left' className={classes.column}>
        {row.description}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatValue(row.amount)}
      </TableCell>
    </TableRow>
  )
}
