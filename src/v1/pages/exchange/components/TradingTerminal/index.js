import React from 'react'
import MarketModulee from './modules'
import MonitornigModule from './components/Monitoring/modules'
import OverviewExchange from './OverviewExchange'
const { MarketProvider } = MarketModulee
const { MonitoringProvider } = MonitornigModule

const Overview = () => {
  return (
    <MarketProvider>
      <MonitoringProvider>
        <OverviewExchange />
      </MonitoringProvider>
    </MarketProvider>
  )
}

export default Overview
