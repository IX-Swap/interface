import { Grid, Tab, Tabs } from '@material-ui/core'
import { OpenOrders } from 'app/pages/exchange/components/OpenOrders/OpenOrders'
import { PastOrderTable } from 'app/pages/exchange/components/PastOrderTable/PastOrderTable'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
import { useParams } from 'react-router'

export const MyOrders = () => {
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
        <OpenOrders />
      </TabPanel>

      <TabPanel pt={3} value={selectedIdx} index={1}>
        <PastOrderTable pairId={pairId} />
      </TabPanel>
    </Grid>
  )
}
