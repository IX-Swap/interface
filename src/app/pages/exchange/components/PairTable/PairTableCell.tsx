import React from 'react'
import { TableCell, TableCellProps } from '@material-ui/core'
import { useStyles } from 'app/pages/exchange/components/PairTable/PairTable.styles'

export interface PairTableCellProps extends TableCellProps {}

export const PairTableCell = ({ children, ...rest }: PairTableCellProps) => {
  const { pairTableCell } = useStyles({})
  return (
    <TableCell className={pairTableCell} {...rest}>
      {children}
    </TableCell>
  )
}
