import { Grid, Tab, Tabs } from '@mui/material'
import { MarketTrades } from 'app/pages/invest/components/Trades/MarketTrades'
import { MyTrades } from 'app/pages/invest/components/Trades/MyTrades'
import { useStyles } from 'app/pages/invest/components/Trades/Trades.styles'
import { TabPanel } from 'components/TabPanel'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'

export const Trades = () => {
  const { tab, tabPanel } = useStyles()
  const { theme } = useAppBreakpoints()
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      style={{
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#292929',
        marginTop: 10
      }}
    >
      <Grid item>
        <Tabs
          variant='fullWidth'
          value={activeTab}
          indicatorColor='primary'
          onChange={handleChange}
        >
          <Tab className={tab} label='Market Trades' />
          <Tab className={tab} label='My Trades' />
        </Tabs>
      </Grid>
      <Grid item>
        <TabPanel pt={1} value={activeTab} index={0} className={tabPanel}>
          <MarketTrades />
        </TabPanel>
        <TabPanel pt={1} value={activeTab} index={1} className={tabPanel}>
          <MyTrades />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
