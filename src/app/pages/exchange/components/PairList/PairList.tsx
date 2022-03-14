import { PairTable } from 'app/pages/exchange/components/PairTable/PairTable'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import React from 'react'

export const PairList = () => {
  const { data, fetchMore, canFetchMore } = useMarketList(true)

  if (data === undefined || data.list.length < 1) {
    return null
  }

  const loadMore = () => {
    if (canFetchMore !== undefined && canFetchMore) {
      void fetchMore()
    }
  }

  return <PairTable data={data.list} loadMore={loadMore} />
}
