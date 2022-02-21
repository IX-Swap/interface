import React, { Fragment, useEffect, useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { VSpacer } from 'components/VSpacer'
import { DSOPricingViewCompact } from 'app/components/DSO/components/DSOPricingViewCompact'
import { DSOTermsViewCompact } from 'app/components/DSO/DSOPreview/DSOTermsViewCompact'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { Element } from 'react-scroll'
import { DSOFormSection } from 'app/components/DSO/DSOScrollGuide'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'
import { DSOFAQsView } from 'app/components/DSO/components/DSOFAQsView'
import { DSOVideoLinksView } from 'app/components/DSO/components/DSOVideoLinksView'
import { Commitments } from 'app/pages/issuance/pages/Commitments'
import { CapTable } from 'app/pages/issuance/pages/CapTable'
import { Tabs, Tab, Grid } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOPreviewActions } from 'app/components/DSO/components/DSOPreviewActions'

export interface DSOPreviewProps {
  data: DigitalSecurityOffering
  showSidebar?: boolean
}

export const DSOPreview = (props: DSOPreviewProps) => {
  const { data, showSidebar = false } = props
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [showStatusBar, setShowStatusBar] = useState(showSidebar)

  useEffect(() => {
    selectedIdx !== 0 && setShowStatusBar(false)
    selectedIdx === 0 && setShowStatusBar(true)
  }, [selectedIdx])

  useSetPageTitle(data.tokenName)

  const renderFAQsFormSection = () => {
    if (data.faqs === undefined || data.faqs.length < 1) {
      return null
    }
    return (
      <Element name={DSOFormSection.FAQs}>
        <VSpacer size='large' />
        <DSOFAQsView dso={data} isTitleVisible />
      </Element>
    )
  }

  const renderVideosFormSection = () => {
    if (data.videos === undefined || data.videos.length < 1) {
      return null
    }
    return (
      <Element name={DSOFormSection.Videos}>
        <VSpacer size='large' />
        <DSOVideoLinksView dso={data} isTitleVisible />
      </Element>
    )
  }

  return (
    <>
      <Grid container>
        <Grid item lg={showStatusBar ? 9 : 12} container direction='column'>
          <Tabs
            value={selectedIdx}
            onChange={(_, index) => setSelectedIdx(index)}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='Overview' />
            <Tab label='Commitments' />
            <Tab label='CapTable' />
          </Tabs>

          <TabPanel value={selectedIdx} index={0}>
            <Grid container spacing={9}>
              <Grid item xs={12}>
                <Element name={DSOFormSection.Pricing}>
                  <DSOPricingViewCompact dso={data} />
                </Element>
              </Grid>

              <Grid item xs={12}>
                <Element name={DSOFormSection['Offering Terms']}>
                  <DSOTermsViewCompact dso={data} />
                </Element>
              </Grid>
            </Grid>

            <Element name={DSOFormSection.Information}>
              <VSpacer size='large' />
              <DSOInformationView dso={data} isNewThemeOn />
            </Element>

            <Element name={DSOFormSection['Team Members']}>
              <VSpacer size='large' />
              <DSOTeamView dso={data} isNewThemeOn />
            </Element>

            <Element name={DSOFormSection.Documents}>
              <VSpacer size='large' />
              <DSODataroomView dso={data} isNewThemeOn />
            </Element>

            {renderVideosFormSection()}
            {renderFAQsFormSection()}
          </TabPanel>

          <TabPanel value={selectedIdx} index={1}>
            <Commitments />
          </TabPanel>

          <TabPanel value={selectedIdx} index={2}>
            <CapTable />
          </TabPanel>
        </Grid>

        {showStatusBar && (
          <Grid item lg={3}>
            <DSOSidebar dso={data} footer={<DSOPreviewActions dso={data} />} />
          </Grid>
        )}
      </Grid>
    </>
  )
}
