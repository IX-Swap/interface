import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { TradeItem } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmountValue } from 'helpers/numbers'

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
        {formatAmountValue(row.price)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.total)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.fee)}
      </TableCell>
    </TableRow>
  )
}
