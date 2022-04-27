import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import {
  isMarketDataFalsy,
  isPairIdFalsy
} from 'app/pages/exchange/utils/order'
import React from 'react'
import { generatePath, Redirect, useParams } from 'react-router-dom'
import { TradingContainer } from '../components/Trading/TradingContainer'
import { InvestRoute } from '../router/config'

export const Trading = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data, isLoading } = useMarketList()

  if ((isMarketDataFalsy(data), isLoading)) {
    return null
  }

  if (isPairIdFalsy(pairId)) {
    const firstPair = data.list[0]
    const to =
      firstPair !== undefined
        ? generatePath(InvestRoute.trading, { pairId: data?.list[0]?._id })
        : InvestRoute.tradingRoot

    return <Redirect to={to} />
  }

  return <TradingContainer />
}
