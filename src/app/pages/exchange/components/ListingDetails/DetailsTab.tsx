import { Grid, Tab, Tabs } from '@mui/material'
import { Information } from 'app/pages/exchange/components/ListingDetails/Information/Information'
import { Overview } from 'app/pages/exchange/components/ListingDetails/Overview/Overview'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
import { ListingView } from 'types/listing'

export interface DetailsTabProps {
  data: ListingView
}

export const DetailsTab = ({ data }: DetailsTabProps) => {
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
          <Overview data={data} />
        </TabPanel>
        <TabPanel index={1} value={tabValue}>
          <Information data={data} />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
