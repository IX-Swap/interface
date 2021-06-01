import { TableRow } from '@material-ui/core'
import { OrderBookCell } from 'app/pages/invest/components/OrderBook/OrderBookCell'
import { useStyles } from 'app/pages/invest/components/OrderBook/OrderBookRow.styles'
import React from 'react'

export interface OrderBookRowProps {
  price: number
  amount: number
  total: number
  transaction?: 'buy' | 'sell'
}

export const OrderBookRow = ({
  price,
  amount,
  total,
  transaction = 'buy'
}: OrderBookRowProps) => {
  const { tableRow } = useStyles({ value: (amount / total) * 100, transaction })
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
