import { Table, TableBody } from '@material-ui/core'
import { OrderBookHeader } from 'app/pages/invest/components/OrderBook/OrderBookHeader'
import { OrderBookRow } from 'app/pages/invest/components/OrderBook/OrderBookRow'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface OrderBookDataItem {
  price: number
  amount: number
  total: number
}

export interface OrderBookProps {
  data?: OrderBookDataItem[]
  transaction: 'buy' | 'sell'
  tokenSymbol: string
  currency: ValidCurrency
  showHeader?: boolean
}

export const OrderBook = ({
  transaction,
  tokenSymbol,
  currency,
  data = [],
  showHeader = false
}: OrderBookProps) => {
  return (
    <Table>
      {showHeader ? (
        <OrderBookHeader tokenSymbol={tokenSymbol} currency={currency} />
      ) : null}
      <TableBody>
        {data.map(({ price, amount, total }) => (
          <OrderBookRow
            transaction={transaction}
            price={price}
            amount={amount}
            total={total}
          />
        ))}
      </TableBody>
    </Table>
  )
}
