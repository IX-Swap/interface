import { TradesTable } from 'app/pages/invest/components/Trades/TradesTable'
import { TradesTableRowProps } from 'app/pages/invest/components/Trades/TradesTableRow'
import { useTradeHistory } from 'app/pages/invest/hooks/useTradeHistory'
import React from 'react'
import { useParams } from 'react-router'

export const MarketTrades = () => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const { data } = useTradeHistory(dsoId)

  return <TradesTable data={data as TradesTableRowProps[]} />
}
