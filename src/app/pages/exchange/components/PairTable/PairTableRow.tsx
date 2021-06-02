import { TableRow } from '@material-ui/core'
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
  return (
    <TableRow>
      <PairTableCell>
        <PairName pair={item} />
      </PairTableCell>
      <PairTableCell>
        <LastPrice value={item.lastPrice} trend={item.trend} />
      </PairTableCell>
      <PairTableCell align='right'>
        <Change value={item.change} trend={item.trend} />
      </PairTableCell>
    </TableRow>
  )
}
