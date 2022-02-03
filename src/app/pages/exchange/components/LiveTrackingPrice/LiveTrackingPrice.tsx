import { TrackingPrice } from 'app/pages/exchange/components/LiveTrackingPrice/TrackingPrice'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useLastPrice } from 'app/pages/exchange/hooks/useLastPrice'
import { useTradeHistory } from 'app/pages/exchange/hooks/useTradeHistory'
import { OrderSide } from 'types/order'

export const LiveTrackingPrice = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data: lastPriceData } = useLastPrice(pairId)
  const { marketTrades } = useTradeHistory(pairId)
  if (lastPriceData === undefined || marketTrades === undefined) {
    return null
  }

  const getTrend = () => {
    const lastTrade = marketTrades[0] ?? []
    if (lastPriceData === lastTrade.price && lastTrade.side === OrderSide.BID) {
      return 'up'
    }
    return 'down'
  }

  return <TrackingPrice price={lastPriceData} trend={getTrend()} />
}
