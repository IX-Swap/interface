import { TableRow } from '@material-ui/core'
import { OrderBookCell } from 'app/pages/exchange/components/OrderBook/OrderBookCell'
import { useStyles } from 'app/pages/exchange/components/OrderBook/OrderBookRow.styles'
import React from 'react'

export interface OrderBookRowProps {
  price: number
  amount: number
  total: number
  count: number
  transaction?: 'buy' | 'sell'
}

export const OrderBookRow = ({
  price,
  amount,
  total,
  transaction = 'buy'
}: OrderBookRowProps) => {
  const { tableRow } = useStyles({
    value: (total / 10000) * 100,
    transaction
  })
  return (
    <TableRow className={tableRow}>
      <OrderBookCell transaction={transaction}>{price}</OrderBookCell>
      <OrderBookCell align='right' transaction={transaction}>
        {amount}
      </OrderBookCell>
      <OrderBookCell align='right' transaction={transaction}>
        {total}
      </OrderBookCell>
    </TableRow>
  )
}
