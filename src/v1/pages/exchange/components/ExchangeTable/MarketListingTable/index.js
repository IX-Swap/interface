import React from 'react'
import MarketModule from '../../TradingTerminal/modules'
import TableMarketListings from './TableMarketListings'
const { MarketProvider } = MarketModule

const Overview = () => {
  return (
    <MarketProvider>
      <TableMarketListings title='Markets' />
    </MarketProvider>
  )
}

export default Overview
