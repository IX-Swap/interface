import { TradesTable } from 'app/pages/exchange/components/Trades/TradesTable'
import { TradesTableRowProps } from 'app/pages/exchange/components/Trades/TradesTableRow'
import { useTradeHistory } from 'app/pages/exchange/hooks/useTradeHistory'
import React from 'react'
import { useParams } from 'react-router-dom'

export const MyTrades = () => {
  const { pairId } = useParams<{ pairId: string }>()
  const { myTrades } = useTradeHistory(pairId)

  if (myTrades === undefined) {
    return null
  }

  return <TradesTable data={myTrades as TradesTableRowProps[]} />
}
