import { Grid, Tab, Tabs } from '@mui/material'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { TabPanel } from 'components/TabPanel'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { MarketTrades } from 'app/pages/invest/components/Trades/MarketTrades'
import { IBasicDataFeed } from 'charting_library'

export interface TopSectionProps {
  symbol: string
  datafeed?: IBasicDataFeed
}

export const TopSection = ({ symbol, datafeed }: TopSectionProps) => {
  const [value, setValue] = useState(0)
  const { theme } = useAppBreakpoints()

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Chart' />
          <Tab label='Market Order' />
          <Tab label='Market Trades' />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={value} index={0} pt={2}>
          {symbol.length > 0 && (
            <TVChartContainer
              viewport='small'
              data-testid={'tv-chart-container-data-test-id'}
              datafeed={datafeed}
              symbol={symbol}
              theme={theme.palette.mode === 'dark' ? 'Dark' : 'Light'}
              toolbarBg={theme.palette.mode === 'dark' ? '#292929' : ''}
              customCssUrl={'./trading-view_dark.css'}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1} pt={2}>
          <InvestorLiveOrderBook />
        </TabPanel>
        <TabPanel value={value} index={2} pt={2}>
          <MarketTrades />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
