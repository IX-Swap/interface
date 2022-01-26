import { TableCell, TableCellProps } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/Trades/TradesTablecell.styles'
import React from 'react'
export interface TradesTableCellProps extends TableCellProps {
  transaction?: 'BID' | 'ASK'
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
