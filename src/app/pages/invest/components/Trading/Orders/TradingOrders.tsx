import { Grid, Tab, Tabs } from '@mui/material'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
import { useStyles } from '../TradingContainer.styles'
import { TradingOpenOrders } from './OpenOrders/TradingOpenOrders'
import { PastOTCOrders } from './PastOrders/PastOTCOrders'

export const TradingOrders = () => {
  const classes = useStyles()
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <div>
      <Grid item className={classes.colorGrid}>
        <Tabs
          style={{ marginBottom: '30px' }}
          value={selectedIdx}
          onChange={(_, index) => setSelectedIdx(index)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='Open Orders' />
          <Tab label='Past Orders' />
        </Tabs>
        <StatusFilter index={selectedIdx} />
      </Grid>

      <Grid>
        <TabPanel pt={3} value={selectedIdx} index={0}>
          <TradingOpenOrders />
        </TabPanel>

        <TabPanel pt={3} value={selectedIdx} index={1}>
          <PastOTCOrders />
        </TabPanel>
      </Grid>
    </div>
  )
}
