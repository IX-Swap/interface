import React, { Fragment, useState } from 'react'
import { DSOInvestorViewHeader } from 'app/components/DSO/components/DSOInvestorViewHeader'
import { DigitalSecurityOffering } from 'types/dso'
import { Tabs, Tab, Grid } from '@material-ui/core'
import { DSOInvestorOverview } from 'app/components/DSO/components/DSOInvestorOverview'
import { DSOPricingViewCompact } from 'app/components/DSO/components/DSOPricingViewCompact'
import { DSOTermsViewCompact } from 'app/components/DSO/DSOPreview/DSOTermsViewCompact'
import { TabPanel } from 'components/TabPanel'
import { DSOInvestorInformationView } from 'app/components/DSO/components/DSOInvestorInformationView'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'

export interface DSOInvestorViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorView = (props: DSOInvestorViewProps) => {
  const { dso } = props
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <Fragment>
      <DSOInvestorViewHeader dso={dso} />

      <Tabs
        value={selectedIdx}
        onChange={(_, index) => setSelectedIdx(index)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Overview' />
        <Tab label='Information' />
        <Tab label='Documents' />
      </Tabs>

      <TabPanel value={selectedIdx} index={0}>
        <Grid container spacing={9}>
          <Grid item xs={12}>
            <DSOInvestorOverview dso={dso} />
          </Grid>

          <Grid item xs={12}>
            <DSOPricingViewCompact dso={dso} />
          </Grid>

          <Grid item xs={12}>
            <DSOTermsViewCompact dso={dso} />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={selectedIdx} index={1}>
        <DSOInvestorInformationView dso={dso} />
      </TabPanel>

      <TabPanel value={selectedIdx} index={2}>
        <DSODataroomView dso={dso} showTitle={false} />
      </TabPanel>
    </Fragment>
  )
}
