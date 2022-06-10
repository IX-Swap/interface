import React, { Fragment, useState } from 'react'
import { DSOInvestorViewHeader } from 'app/components/DSO/components/DSOInvestorViewHeader'
import { DigitalSecurityOffering } from 'types/dso'
import { Tabs, Tab, Grid } from '@mui/material'
import { DSOPricingViewCompact } from 'app/components/DSO/components/DSOPricingViewCompact'
import { DSOTermsViewCompact } from 'app/components/DSO/DSOPreview/DSOTermsViewCompact'
import { TabPanel } from 'components/TabPanel'
import { DSOInvestorInformationView } from 'app/components/DSO/components/DSOInvestorInformationView'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'
import { DSOFAQsView } from 'app/components/DSO/components/DSOFAQsView'
import { DSOVideoLinksView } from 'app/components/DSO/components/DSOVideoLinksView'

export interface DSOInvestorViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorView = (props: DSOInvestorViewProps) => {
  const { dso } = props
  const [selectedIdx, setSelectedIdx] = useState(0)
  const isDSOVideosVisible = dso.videos !== undefined && dso.videos.length > 0
  const isDSOFAQsVisible = dso.faqs !== undefined && dso.faqs.length > 0

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
        {isDSOVideosVisible ? <Tab label='Videos' /> : null}
        {isDSOFAQsVisible ? <Tab label='FAQs' /> : null}
      </Tabs>

      <TabPanel value={selectedIdx} index={0}>
        <Grid container spacing={9} pl={3}>
          <Grid item xs={12}>
            <DSOPricingViewCompact dso={dso} />
          </Grid>

          {dso.isCampaign !== true && (
            <Grid item xs={12} pl={3}>
              <DSOTermsViewCompact dso={dso} />
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={selectedIdx} index={1}>
        <DSOInvestorInformationView dso={dso} />
      </TabPanel>

      <TabPanel value={selectedIdx} index={2}>
        <DSODataroomView dso={dso} showTitle={false} />
      </TabPanel>

      {isDSOVideosVisible ? (
        <TabPanel value={selectedIdx} index={3}>
          <DSOVideoLinksView dso={dso} />
        </TabPanel>
      ) : null}

      {isDSOFAQsVisible ? (
        <TabPanel value={selectedIdx} index={4}>
          <DSOFAQsView dso={dso} isTitleVisible isNewThemeOn />
        </TabPanel>
      ) : null}
    </Fragment>
  )
}
