import { isPairIdFalsy } from 'app/pages/exchange/utils/order'
import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { TradingContainer } from '../components/Trading/TradingContainer'
import { useFeaturedPair } from '../hooks/useFeaturedPair'

export const Trading = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { data, isLoading } = useFeaturedPair()
  if (data === undefined || data === null || isLoading) {
    return null
  }

  if (isPairIdFalsy(pairId)) {
    const to = data._id
    return <Redirect to={to} />
  }
  return <TradingContainer />
}
