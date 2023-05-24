import { Grid, Tab, Tabs } from '@mui/material'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
import { TradingOpenOrders } from './OpenOrders/TradingOpenOrders'
import { PastOTCOrders } from './PastOrders/PastOTCOrders'

export const TradingOrders = () => {
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <Grid>
      <Tabs
        value={selectedIdx}
        onChange={(_, index) => setSelectedIdx(index)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Open Orders' />
        <Tab label='Past Orders' />
      </Tabs>

      <TabPanel pt={3} value={selectedIdx} index={0}>
        <StatusFilter />
        <TradingOpenOrders />
      </TabPanel>

      <TabPanel pt={3} value={selectedIdx} index={1}>
        <PastOTCOrders />
      </TabPanel>
    </Grid>
  )
}
