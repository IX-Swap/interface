import { TableRow } from '@material-ui/core'
import { TradesTableCell } from 'app/pages/exchange/components/Trades/TradesTableCell'
import { format24HTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import React from 'react'

export interface TradesTableRowProps {
  price: number
  amount: number
  createdAt: string
  side: 'BID' | 'ASK'
}

export const TradesTableRow = ({
  price,
  amount,
  createdAt,
  side
}: TradesTableRowProps) => {
  return (
    <TableRow>
      <TradesTableCell transaction={side}>
        {formatAmount(price)}
      </TradesTableCell>
      <TradesTableCell align='right'>{formatAmount(amount)}</TradesTableCell>
      <TradesTableCell align='right'>
        {format24HTime(createdAt)}
      </TradesTableCell>
    </TableRow>
  )
}
