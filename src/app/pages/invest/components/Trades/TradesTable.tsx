import { Table, TableBody } from '@material-ui/core'
import React from 'react'
import {
  TradesTableRow,
  TradesTableRowProps
} from 'app/pages/invest/components/Trades/TradesTableRow'
import { TradesTableHeader } from 'app/pages/invest/components/Trades/TradesTableHeader'

export interface TradesTableProps {
  data: TradesTableRowProps[]
}

export const TradesTable = ({ data }: TradesTableProps) => {
  return (
    <Table>
      <TradesTableHeader tokenSymbol='IXPS' />
      <TableBody>
        {data.map((item, i) => (
          <TradesTableRow key={i} {...item} />
        ))}
      </TableBody>
    </Table>
  )
}
