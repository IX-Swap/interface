import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { OpenPositionItem } from 'types/reports'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmountValue } from 'helpers/numbers'

export interface OpenPositionRowProps {
  rowsLength: number
  row: OpenPositionItem | any
  index: number
}

export const OpenPositionRow = ({
  row,
  index,
  rowsLength
}: OpenPositionRowProps) => {
  const classes = useStyles({ rowIdx: index, rowsLength: rowsLength })

  return (
    <TableRow key={row.pair} className={classes.row}>
      <TableCell component='th' scope='row' className={classes.column}>
        {row.pair}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatReportsDateAndTime(row.date)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {row.amount}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.price)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.costValue)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.lastTradePrice)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.currentValue)}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.unrealizedPnl)}
      </TableCell>
    </TableRow>
  )
}
