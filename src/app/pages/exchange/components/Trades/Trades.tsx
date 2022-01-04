import { Grid, Tab, Tabs } from '@material-ui/core'
import { MarketTrades } from 'app/pages/exchange/components/Trades/MarketTrades'
import { MyTrades } from 'app/pages/exchange/components/Trades/MyTrades'
import { useStyles } from 'app/pages/exchange/components/Trades/Trades.styles'
import { MarketTabPanel } from 'components/MarketTabPanel'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'

export const Trades = () => {
  const { tab } = useStyles()
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
        backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#292929',
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
        <MarketTabPanel pt={1} value={activeTab} index={0}>
          <MarketTrades />
        </MarketTabPanel>
        <MarketTabPanel pt={1} value={activeTab} index={1}>
          <MyTrades />
        </MarketTabPanel>
      </Grid>
    </Grid>
  )
}
