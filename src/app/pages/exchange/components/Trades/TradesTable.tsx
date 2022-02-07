import { Table, TableBody } from '@mui/material'
import React from 'react'
import {
  TradesTableRow,
  TradesTableRowProps
} from 'app/pages/exchange/components/Trades/TradesTableRow'
import { TradesTableHeader } from 'app/pages/exchange/components/Trades/TradesTableHeader'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { useParams } from 'react-router-dom'

export interface TradesTableProps {
  data: TradesTableRowProps[]
}

export const TradesTable = ({ data }: TradesTableProps) => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data: tradingPair } = useMarket(pairId)

  return (
    <Table>
      <TradesTableHeader tokenSymbol={tradingPair?.listing.tokenSymbol} />
      <TableBody>
        {data.map((item, i) => (
          <TradesTableRow key={i} {...item} />
        ))}
      </TableBody>
    </Table>
  )
}
