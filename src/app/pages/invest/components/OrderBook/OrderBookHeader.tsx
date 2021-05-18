import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface OrderBookHeaderProps {
  tokenSymbol: string
  currency: ValidCurrency
}

export const OrderBookHeaderCell = withStyles({
  root: {
    borderBottom: '1px solid transparent',
    fontSize: 12
  }
})(TableCell)

export const OrderBookHeader = ({
  tokenSymbol,
  currency
}: OrderBookHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        <OrderBookHeaderCell>Price</OrderBookHeaderCell>
        <OrderBookHeaderCell align='right'>
          Amount ({tokenSymbol})
        </OrderBookHeaderCell>
        <OrderBookHeaderCell align='right'>
          Total ({currency})
        </OrderBookHeaderCell>
      </TableRow>
    </TableHead>
  )
}
