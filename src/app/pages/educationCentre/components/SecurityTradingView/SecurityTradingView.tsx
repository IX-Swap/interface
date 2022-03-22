import { Grid, Typography } from '@mui/material'
import { TimeSeriesChart } from 'app/pages/educationCentre/components/Charts/SecurityTimeSeriesChart'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import {
  RightAlignedTabs,
  SmallTab
} from 'app/pages/educationCentre/components/SecuritiesMarketsTabs/StyledTab'
import { PriceChangesTable } from 'app/pages/educationCentre/components/SecurityTradingView/PriceChangesTable'
import { YearlyAnalysis } from 'app/pages/educationCentre/components/SecurityTradingView/YearlyAnalysis'
import { useTimeSeries } from 'app/pages/educationCentre/hooks/useTimeSeries'
import { TabPanel } from 'components/TabPanel'
import { VSpacer } from 'components/VSpacer'
import { format } from 'date-fns'
import { hasValue } from 'helpers/forms'
import { formatMoney } from 'helpers/numbers'
import React, { useState } from 'react'

export interface SecurityTradingViewProps {
  data: Security
}

export const SecurityTradingView = ({ data }: SecurityTradingViewProps) => {
  const { data: fetchedData, isLoading } = useTimeSeries()
  const [tabValue, setTabValue] = useState<number>(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  const timeSeriesData = fetchedData ?? []

  if (isLoading) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Typography
              variant='subtitle1'
              align='right'
              style={{ fontWeight: 'bold' }}
            >
              {hasValue(data.currentPrice)
                ? formatMoney(data.currentPrice ?? 0, '$')
                : ''}
            </Typography>
            <Typography variant='body1'>
              {format(new Date(), 'EEE LLL dd yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <RightAlignedTabs
          value={tabValue}
          onChange={handleChange}
          style={{ justifyContent: 'flex-end' }}
        >
          <SmallTab label='1W' />
          <SmallTab label='1M' />
          <SmallTab label='6M' />
          <SmallTab label='YTD' />
          <SmallTab label='1Y' />
          <SmallTab label='MAX' />
        </RightAlignedTabs>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={tabValue} index={0} withoutSpacing>
          <TimeSeriesChart data={timeSeriesData} range='1W' />
        </TabPanel>
        <TabPanel value={tabValue} index={1} withoutSpacing>
          <TimeSeriesChart data={timeSeriesData} range='1M' />
        </TabPanel>
        <TabPanel value={tabValue} index={2} withoutSpacing>
          <TimeSeriesChart data={timeSeriesData} range='6M' />
        </TabPanel>
        <TabPanel value={tabValue} index={3} withoutSpacing>
          <TimeSeriesChart data={timeSeriesData} range='YTD' />
        </TabPanel>
        <TabPanel value={tabValue} index={4} withoutSpacing>
          <TimeSeriesChart data={timeSeriesData} range='1Y' />
        </TabPanel>
        <TabPanel value={tabValue} index={5} withoutSpacing>
          <TimeSeriesChart data={timeSeriesData} range='MAX' />
        </TabPanel>
      </Grid>
      <Grid item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <PriceChangesTable data={data} />
          </Grid>
          <Grid item xs={12} md={6}>
            <YearlyAnalysis data={data} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
