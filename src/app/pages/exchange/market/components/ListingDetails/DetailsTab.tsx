import { Grid, Tab, Tabs } from '@material-ui/core'
import { Information } from 'app/pages/exchange/market/components/ListingDetails/Information/Information'
import { Overview } from 'app/pages/exchange/market/components/ListingDetails/Overview/Overview'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'

export const DetailsTab = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label='Overview' />
          <Tab label='Information' />
        </Tabs>
      </Grid>
      <Grid item>
        <TabPanel index={0} value={tabValue}>
          <Overview />
        </TabPanel>
        <TabPanel index={1} value={tabValue}>
          <Information />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
