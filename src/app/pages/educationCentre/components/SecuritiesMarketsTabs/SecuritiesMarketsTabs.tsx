import { Grid, Tab } from '@mui/material'
import { Charts } from 'app/pages/educationCentre/components/Charts/Charts'
import { Filters } from 'app/pages/educationCentre/components/Securities/Filters'
import { Securities } from 'app/pages/educationCentre/components/Securities/Securities'
import { StyledTabs } from 'app/pages/educationCentre/components/SecuritiesMarketsTabs/StyledTab'
import { useSecurities } from 'app/pages/educationCentre/hooks/useSecurities'
import { useToggleView } from 'app/pages/educationCentre/hooks/useToggleView'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'

export const SecuritiesMarketsTabs = () => {
  const { data, isLoading } = useSecurities()
  const { view, toggleView } = useToggleView()

  const [tabValue, setTabValue] = useState<number>(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <StyledTabs value={tabValue} onChange={handleChange}>
            <Tab label='SECURITIES' />
            <Tab label='CHARTS' />
          </StyledTabs>
        </Grid>
        <Grid item xs={12}>
          <Filters
            view={view}
            toggleView={toggleView}
            showViewToggle={tabValue === 0}
          />
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabValue} index={0} withoutSpacing>
            <Securities data={data} view={view} isLoading={isLoading} />
          </TabPanel>
          <TabPanel value={tabValue} index={1} withoutSpacing>
            <Charts data={data} isLoading={isLoading} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}
