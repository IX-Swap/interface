import React from 'react'
import { TableCell, TableCellProps } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/OrderBook/OrderBookCell.styles'

export interface OrderBookCellProps extends TableCellProps {
  transaction?: 'buy' | 'sell'
}

export const OrderBookCell = ({
  children,
  transaction = 'buy',
  ...rest
}: OrderBookCellProps) => {
  const { tableCell } = useStyles({ transaction: transaction })
  return (
    <TableCell className={tableCell} {...rest}>
      {children}
    </TableCell>
  )
}
