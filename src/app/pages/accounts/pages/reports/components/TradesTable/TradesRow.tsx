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
import { OpenPositionItem, TradeItem } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import { formatValue } from 'app/pages/accounts/pages/reports/helper'

export interface TradesRowProps {
  row: TradeItem | any
  index: number
}

export const TradesRow = ({ row, index }: TradesRowProps) => {
  const classes = useStyles({ rowIdx: index })

  return (
    <TableRow key={row.pair} className={classes.row}>
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        className={classes.column}
      >
        {row.pair}
      </TableCell>
      <TableCell align='left' className={classes.column}>
        {formatReportsDateAndTime(row.createdAt)}
      </TableCell>
      <TableCell align='left' className={classes.column}>
        {row.type}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {row.quantity}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatValue(row.price)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatValue(row.total)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatValue(row.fee)}
      </TableCell>
    </TableRow>
  )
}
