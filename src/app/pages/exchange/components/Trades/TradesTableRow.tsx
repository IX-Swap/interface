import { TableRow } from '@mui/material'
import { TradesTableCell } from 'app/pages/exchange/components/Trades/TradesTablecell'
import { format24HTime } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import React from 'react'
import { OrderSide } from 'types/order'

export interface TradesTableRowProps {
  price: number
  amount: number
  createdAt: string
  side: OrderSide
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
