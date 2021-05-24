import { PairTable } from 'app/pages/exchange/market/components/PairTable/PairTable'
import { useMarketList } from 'app/pages/exchange/market/hooks/useMarketList'
import React from 'react'

export const PairList = () => {
  const { data } = useMarketList()

  if (data === undefined) {
    return null
  }

  return <PairTable data={data} />
}
