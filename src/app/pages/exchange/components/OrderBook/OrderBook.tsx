import { Table, TableBody } from '@material-ui/core'
import { OrderBookHeader } from 'app/pages/exchange/components/OrderBook/OrderBookHeader'
import { OrderBookRow } from 'app/pages/exchange/components/OrderBook/OrderBookRow'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface OrderBookDataItem {
  price: number
  amount: number
  total: number
  count: number
}

export interface OrderBookProps {
  data?: OrderBookDataItem[]
  transaction: 'buy' | 'sell'
  tokenSymbol: string
  currency: ValidCurrency
  showHeader?: boolean
  barOrigin?: 'left' | 'right'
}

export const OrderBook = ({
  transaction,
  tokenSymbol,
  currency,
  data = [],
  showHeader = false,
  barOrigin = 'right'
}: OrderBookProps) => {
  return (
    <Table>
      {showHeader ? (
        <OrderBookHeader tokenSymbol={tokenSymbol} currency={currency} />
      ) : null}
      <TableBody>
        {data.map(({ price, amount, total, count }, index) => (
          <OrderBookRow
            key={index}
            transaction={transaction}
            price={price}
            count={count}
            amount={amount}
            total={total}
            barOrigin={barOrigin}
          />
        ))}
      </TableBody>
    </Table>
  )
}
