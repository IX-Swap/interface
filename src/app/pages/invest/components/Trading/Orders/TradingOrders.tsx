import { Grid, Tab, Tabs } from '@mui/material'
import { PastOrderTable } from 'app/pages/exchange/components/PastOrderTable/PastOrderTable'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TradingOpenOrders } from './OpenOrders/TradingOpenOrders'

export const TradingOrders = () => {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const { pairId } = useParams<{ pairId: string }>()

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
        <TradingOpenOrders />
      </TabPanel>

      <TabPanel pt={3} value={selectedIdx} index={1}>
        <PastOrderTable pairId={pairId} />
      </TabPanel>
    </Grid>
  )
}
