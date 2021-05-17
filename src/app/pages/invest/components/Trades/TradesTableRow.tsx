import { TableRow } from '@material-ui/core'
import { TradesTableCell } from 'app/pages/invest/components/Trades/TradesTablecell'
import { formatAmount } from 'helpers/numbers'
import React from 'react'

export interface TradesTableRowProps {
  price: number
  amount: number
  time: string
  transaction: 'buy' | 'sell'
}

export const TradesTableRow = ({
  price,
  amount,
  time,
  transaction
}: TradesTableRowProps) => {
  return (
    <TableRow>
      <TradesTableCell transaction={transaction}>
        {formatAmount(price)}
      </TradesTableCell>
      <TradesTableCell align='right'>{formatAmount(amount)}</TradesTableCell>
      <TradesTableCell align='right'>{time}</TradesTableCell>
    </TableRow>
  )
}
