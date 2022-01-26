import { Grid, Tab } from '@mui/material'
import { AboutTheFirm } from 'app/pages/educationCentre/components/AboutTheFirm/AboutTheFirm'
import { ComparableSecurities } from 'app/pages/educationCentre/components/ComparableSecurities/ComparableSecurities'
import { Funding } from 'app/pages/educationCentre/components/Funding/Funding'
import { KeyData } from 'app/pages/educationCentre/components/KeyData/KeyData'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import { StyledTabs } from 'app/pages/educationCentre/components/SecuritiesMarketsTabs/StyledTab'
import { SecurityTradingView } from 'app/pages/educationCentre/components/SecurityTradingView/SecurityTradingView'
import { SecurityViewHeader } from 'app/pages/educationCentre/components/SecurityViewHeader/SecurityViewHeader'
import { TabPanel } from 'components/TabPanel'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface SecurityDetailsProps {
  security: Security
  comparableSecurities: Security[]
}

export const SecurityDetails = ({
  security,
  comparableSecurities
}: SecurityDetailsProps) => {
  const [tabValue, setTabValue] = useState<number>(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  const { pathname } = useLocation()

  useEffect(() => {
    setTabValue(0)
  }, [pathname])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SecurityViewHeader data={security} />
      </Grid>
      <Grid item xs={12}>
        <StyledTabs value={tabValue} onChange={handleChange}>
          <Tab label='CHARTS &amp; MARKET ANALYSIS' />
          <Tab label='KEY DATA' />
          <Tab label='ABOUT THE FIRM' />
          <Tab label='FUNDING' />
          <Tab label='COMPARABLE SECURITIES' />
        </StyledTabs>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={tabValue} index={0}>
          <SecurityTradingView data={security} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <KeyData data={security} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AboutTheFirm data={security} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Funding data={security} />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <ComparableSecurities data={comparableSecurities} />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
