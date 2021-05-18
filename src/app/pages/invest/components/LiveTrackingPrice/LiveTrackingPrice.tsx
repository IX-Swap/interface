import { TrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/TrackingPrice'
import React from 'react'
import { useTradeHistory } from 'app/pages/invest/hooks/useTradeHistory'
import { useParams } from 'react-router'

export const LiveTrackingPrice = () => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const { data: tradeHistoryData } = useTradeHistory(dsoId)

  if (tradeHistoryData === undefined || tradeHistoryData.length < 1) {
    return null
  }

  const getTrend = () => {
    if (tradeHistoryData.length === 1) {
      return 'up'
    }
    if (tradeHistoryData[0].price > tradeHistoryData[1].price) {
      return 'up'
    }
    return 'down'
  }

  return <TrackingPrice price={tradeHistoryData[0].price} trend={getTrend()} />
}
