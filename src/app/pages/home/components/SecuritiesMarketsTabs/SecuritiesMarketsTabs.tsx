import { Tab } from '@material-ui/core'
import { Charts } from 'app/pages/home/components/Charts/Charts'
import { Securities } from 'app/pages/home/components/Securities/Securities'
import { SecuritiesMarketNews } from 'app/pages/home/components/SecuritiesMarketNews/SecuritiesMarketNews'
import { StyledTabs } from 'app/pages/home/components/SecuritiesMarketsTabs/StyledTab'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'

export const SecuritiesMarketsTabs = () => {
  const [tabValue, setTabValue] = useState<number>(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <StyledTabs value={tabValue} onChange={handleChange}>
        <Tab label='SECURITIES' />
        <Tab label='CHARTS' />
        <Tab label='NEWS' />
      </StyledTabs>
      <TabPanel value={tabValue} index={0}>
        <Securities />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Charts />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <SecuritiesMarketNews />
      </TabPanel>
    </>
  )
}
