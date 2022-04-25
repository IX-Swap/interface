import { Hidden, TableRow } from '@mui/material'
import { OrderBookCell } from 'app/pages/invest/components/OrderBook/OrderBookCell'
import { useStyles } from 'app/pages/invest/components/OrderBook/OrderBookRow.styles'
import React from 'react'

export interface OrderBookRowProps {
  price: number
  amount: number
  total: number
  count: number
  transaction?: 'buy' | 'sell'
  barOrigin?: 'left' | 'right'
}

export const OrderBookRow = ({
  price,
  amount,
  total,
  transaction = 'buy',
  barOrigin = 'right'
}: OrderBookRowProps) => {
  const { tableRow } = useStyles({
    value: (total / 10000) * 100,
    transaction,
    barOrigin
  })
  return (
    <TableRow className={tableRow}>
      <OrderBookCell transaction={transaction}>{price}</OrderBookCell>
      <OrderBookCell align='right' transaction={transaction}>
        {amount}
      </OrderBookCell>
      <Hidden lgDown>
        <OrderBookCell align='right' transaction={transaction}>
          {total}
        </OrderBookCell>
      </Hidden>
    </TableRow>
  )
}
