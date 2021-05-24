import React from 'react'
import { Pair } from 'app/pages/exchange/market/hooks/useMarketList'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { PairTableCell } from 'app/pages/exchange/market/components/PairTable/PairTableCell'
import { PairTableRow } from 'app/pages/exchange/market/components/PairTable/PairTableRow'

export interface PairTableProps {
  data: Pair[]
}

export const PairTable = ({ data }: PairTableProps) => {
  if (data === undefined || data.length < 1) {
    return null
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <PairTableCell>Pair</PairTableCell>
          <PairTableCell>LastPrice</PairTableCell>
          <PairTableCell align='right'>Change</PairTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item: Pair) => (
          <PairTableRow key={item._id} item={item} />
        ))}
      </TableBody>
    </Table>
  )
}
