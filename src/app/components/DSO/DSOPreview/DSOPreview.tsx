import React, { Fragment, useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'
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
import { Tabs, Tab, Grid } from '@material-ui/core'
import { TabPanel } from 'components/TabPanel'

export interface DSOPreviewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
}

export const DSOPreview = (props: DSOPreviewProps) => {
  const { data } = props
  const [selectedIdx, setSelectedIdx] = useState(0)

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
    <Fragment>
      <Element name={DSOFormSection['DSO Information']}>
        <DSOBaseFieldsView dso={data} />
      </Element>

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
      </TabPanel>

      <TabPanel value={selectedIdx} index={1}>
        <Commitments isNewThemeOn />
      </TabPanel>

      <TabPanel value={selectedIdx} index={2}>
        <CapTable isNewThemeOn />
      </TabPanel>

      <Element name={DSOFormSection.Information}>
        <VSpacer size='large' />
        <DSOInformationView dso={data} />
      </Element>

      <Element name={DSOFormSection['Team Members']}>
        <VSpacer size='large' />
        <DSOTeamView dso={data} />
      </Element>

      <Element name={DSOFormSection.Documents}>
        <VSpacer size='large' />
        <DSODataroomView dso={data} />
      </Element>

      {renderVideosFormSection()}
      {renderFAQsFormSection()}
    </Fragment>
  )
}
