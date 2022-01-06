import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmountValue } from 'helpers/numbers'
import { TradeRowData } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesTable'

export interface TradesRowProps {
  row: TradeRowData
  index: number
  hideFee?: boolean
}

export const TradesRow = ({ row, index, hideFee = false }: TradesRowProps) => {
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
      {!hideFee && (
        <TableCell align='right' className={classes.column}>
          {formatAmountValue(row.fee)}
        </TableCell>
      )}
    </TableRow>
  )
}
