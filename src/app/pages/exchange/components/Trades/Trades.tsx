import { Grid, Tab, Tabs } from '@material-ui/core'
import { MarketTrades } from 'app/pages/exchange/components/Trades/MarketTrades'
import { MyTrades } from 'app/pages/exchange/components/Trades/MyTrades'
import { useStyles } from 'app/pages/exchange/components/Trades/Trades.styles'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
// import { useTheme } from '@material-ui/core/styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const Trades = () => {
  const { tab } = useStyles()
  const { theme } = useAppBreakpoints()
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <Grid
      data-testid={'wrapper'}
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
          data-testid={'tabs'}
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
        <TabPanel pt={1} value={activeTab} index={0}>
          <MarketTrades />
        </TabPanel>
        <TabPanel pt={1} value={activeTab} index={1}>
          <MyTrades />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
