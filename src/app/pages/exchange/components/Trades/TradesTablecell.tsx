import { TableCell, TableCellProps } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/Trades/TradesTablecell.styles'
import React from 'react'
import { OrderSide } from 'types/order'
export interface TradesTableCellProps extends TableCellProps {
  transaction?: OrderSide
}

export const TradesTableCell = ({
  children,
  transaction,
  ...rest
}: TradesTableCellProps) => {
  const { tableCell } = useStyles({ transaction })
  return (
    <TableCell className={tableCell} {...rest}>
      {children}
    </TableCell>
  )
}
