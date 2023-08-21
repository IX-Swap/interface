import React, { useEffect, useState } from 'react'
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
// import { CapTable } from 'app/pages/issuance/pages/CapTable'
import { Tabs, Tab, Grid, Box } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOPreviewActions } from 'app/components/DSO/components/DSOPreviewActions'
import { useStyles } from './DSOPreview.styles'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { VisibilitySwitch } from 'app/pages/authorizer/components/VisibilitySwitch'
import { PromotionSwitch } from 'app/pages/authorizer/components/PromotionSwitch'
import { NonInvestableSwitch } from 'app/pages/authorizer/components/NonInvestableSwitch'
import { useIsAdmin, useIsAuthorizer } from 'helpers/acl'

export interface DSOPreviewProps {
  data: DigitalSecurityOffering
  showSidebar?: boolean
}

export const DSOPreview = (props: DSOPreviewProps) => {
  const { data, showSidebar = false } = props
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [showStatusBar, setShowStatusBar] = useState(showSidebar)
  const { tabs } = useStyles()
  const isAdmin = useIsAdmin()
  const isAuthorizer = useIsAuthorizer()

  useEffect(() => {
    setShowStatusBar(selectedIdx === 0)
  }, [selectedIdx])

  useSetPageTitle(data.tokenName)

  const renderFAQsFormSection = () => {
    if (data.faqs === undefined || data.faqs.length < 1) {
      return null
    }
    return (
      <Element name={DSOFormSection.FAQs}>
        <DSOFAQsView dso={data} />
      </Element>
    )
  }

  const renderVideosFormSection = () => {
    if (data.videos === undefined || data.videos.length < 1) {
      return null
    }
    return (
      <Element name={DSOFormSection.Videos}>
        <DSOVideoLinksView dso={data} />
      </Element>
    )
  }

  return (
    <Grid item container direction='column'>
      <FieldContainer sx={{ marginTop: '15px', px: 2, py: 1, borderRadius: 2 }}>
        <Tabs
          value={selectedIdx}
          onChange={(_, index) => setSelectedIdx(index)}
          indicatorColor='primary'
          textColor='primary'
          className={tabs}
        >
          <Tab label='Overview' />
          <Tab label='Activities' />
          {(isAdmin || isAuthorizer) && <Tab label='Settings' />}
          {/* <Tab label='CapTable' /> */}
        </Tabs>
      </FieldContainer>

      <TabPanel
        value={selectedIdx}
        index={0}
        sx={{ paddingLeft: '25px', marginTop: '-8px' }}
      >
        <Grid container>
          <Grid container spacing={5} item md={showStatusBar ? 9 : 12}>
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

            <Grid item xs={12}>
              <Element name={DSOFormSection.Information}>
                <DSOInformationView dso={data} />
              </Element>
            </Grid>

            <Grid item xs={12}>
              <Element name={DSOFormSection['Team Members']}>
                <DSOTeamView dso={data} isNewThemeOn />
              </Element>
            </Grid>

            <Grid item xs={12}>
              <Element name={DSOFormSection.Documents}>
                <DSODataroomView dso={data} />
              </Element>
            </Grid>

            <Grid item xs={12}>
              {renderVideosFormSection()}
            </Grid>

            <Grid item xs={12}>
              {renderFAQsFormSection()}
            </Grid>
          </Grid>

          {showStatusBar && (
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <DSOSidebar
                dso={data}
                footer={<DSOPreviewActions dso={data} />}
              />
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={selectedIdx} index={1}>
        <Commitments />
      </TabPanel>

      {(isAdmin || isAuthorizer) && (
        <TabPanel value={selectedIdx} index={2}>
          <Box sx={{ background: 'white', marginTop: '-32px' }}>
            <Grid marginLeft={'20px'}>
              <VSpacer size='medium' />
              <NonInvestableSwitch dso={data} />
              <VSpacer size='small' />
              <VisibilitySwitch dso={data} />
              <VSpacer size='small' />
              <PromotionSwitch dso={data} />
              <VSpacer size='medium' />
            </Grid>
          </Box>
        </TabPanel>
      )}
      {/* <TabPanel value={selectedIdx} index={2}>
        <CapTable />
      </TabPanel> */}
    </Grid>
  )
}
