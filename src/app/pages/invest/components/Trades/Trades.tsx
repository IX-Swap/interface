import { Grid, Tab, Tabs } from '@material-ui/core'
import { MarketTrades } from 'app/pages/invest/components/Trades/MarketTrades'
import { MyTrades } from 'app/pages/invest/components/Trades/MyTrades'
import { useStyles } from 'app/pages/invest/components/Trades/Trades.styles'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'

export const Trades = () => {
  const { tab } = useStyles()
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <Grid container spacing={0} direction='column'>
      <Grid item>
        <Tabs variant='fullWidth' value={activeTab} onChange={handleChange}>
          <Tab className={tab} label='Market Trades' />
          <Tab className={tab} label='My Trades' />
        </Tabs>
      </Grid>
      <Grid item>
        <TabPanel value={activeTab} index={0}>
          <MyTrades />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <MarketTrades />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
