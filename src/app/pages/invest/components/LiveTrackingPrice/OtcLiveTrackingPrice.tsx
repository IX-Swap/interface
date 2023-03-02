import { TrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/TrackingPrice'
import React from 'react'

export interface OrderBookProps {
  lastTrade?: any
}

export const OtcLiveTrackingPrice = ({ lastTrade }: OrderBookProps) => {
  if (lastTrade === undefined) {
    return null
  }

  const getTrend = () => {
    if (lastTrade?.orderType === 'BUY') {
      return 'up'
    }
    return 'down'
  }

  return <TrackingPrice price={lastTrade?.price} trend={getTrend()} />
}
