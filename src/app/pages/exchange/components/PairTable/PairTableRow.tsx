import { TableRow } from '@mui/material'
import { Change } from 'app/pages/exchange/components/PairTable/Change'
import { LastPrice } from 'app/pages/exchange/components/PairTable/LastPrice'
import { PairName } from 'app/pages/exchange/components/PairTable/PairName'
import { PairTableCell } from 'app/pages/exchange/components/PairTable/PairTableCell'
import { Pair } from 'app/pages/exchange/hooks/useMarketList'
import React from 'react'

export interface PairTableRowProps {
  item: Pair
}

export const PairTableRow = ({ item }: PairTableRowProps) => {
  const isPositive =
    item._24hChangePercentage !== 0 ? item._24hChangePercentage > 0 : undefined
  return (
    <TableRow>
      <PairTableCell>
        <PairName pair={item} />
      </PairTableCell>
      <PairTableCell>
        <LastPrice value={item.latestPrice} isPositive={isPositive} />
      </PairTableCell>
      <PairTableCell align='right'>
        <Change value={item._24hChangePercentage} isPositive={isPositive} />
      </PairTableCell>
    </TableRow>
  )
}
