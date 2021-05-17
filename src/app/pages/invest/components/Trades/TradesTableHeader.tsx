import { TableCell, TableHead, TableRow } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

export const TradesTableHeaderCell = withStyles({
  root: {
    borderBottom: '1px solid transparent'
  }
})(TableCell)

export interface TradesTableHeaderProps {
  tokenSymbol: string
}

export const TradesTableHeader = ({ tokenSymbol }: TradesTableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        <TradesTableHeaderCell>Price</TradesTableHeaderCell>
        <TradesTableHeaderCell align='right'>
          Amount({tokenSymbol})
        </TradesTableHeaderCell>
        <TradesTableHeaderCell align='right'>Time</TradesTableHeaderCell>
      </TableRow>
    </TableHead>
  )
}
