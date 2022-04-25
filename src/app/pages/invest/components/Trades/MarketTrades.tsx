import { TradesTable } from 'app/pages/invest/components/Trades/TradesTable'
import { TradesTableRowProps } from 'app/pages/invest/components/Trades/TradesTableRow'
import { useTradeHistory } from 'app/pages/invest/hooks/useTradeHistory'
import React from 'react'
import { useParams } from 'react-router-dom'

export const MarketTrades = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { marketTrades } = useTradeHistory(pairId)

  if (marketTrades === undefined) {
    return null
  }

  return <TradesTable data={marketTrades as TradesTableRowProps[]} />
}
