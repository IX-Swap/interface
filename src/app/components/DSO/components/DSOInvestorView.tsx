import React, { useState } from 'react'
import { DSOInvestorViewHeader } from 'app/components/DSO/components/DSOInvestorViewHeader'
import { DigitalSecurityOffering } from 'types/dso'
import { Tabs, Tab, Grid, Box, Paper } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { DSOInvestorInformationView } from 'app/components/DSO/components/DSOInvestorInformationView'
import { DSOFAQsView } from 'app/components/DSO/components/DSOFAQsView'
import { DSOVideoLinksView } from 'app/components/DSO/components/DSOVideoLinksView'
import { Divider } from 'ui/Divider'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'

export interface DSOInvestorViewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorView = (props: DSOInvestorViewProps) => {
  const { dso } = props
  const [selectedIdx, setSelectedIdx] = useState(0)

  const tabStyle = { padding: { xs: 1, md: 4 }, minWidth: { xs: 0, md: 90 } }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DSOInvestorViewHeader dso={dso} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 2 }}>
          <Box width='100%'>
            <Tabs
              value={selectedIdx}
              onChange={(_, index) => setSelectedIdx(index)}
              indicatorColor='primary'
              textColor='primary'
            >
              <Tab sx={tabStyle} label='Information' />
              <Tab sx={tabStyle} label='Documents' />
              <Tab sx={tabStyle} label='Videos' />
              <Tab sx={tabStyle} label='FAQs' />
            </Tabs>
          </Box>
          <Divider />
          <Box width='100%' p={4}>
            <TabPanel value={selectedIdx} index={0} pt={0}>
              <DSOInvestorInformationView dso={dso} />
            </TabPanel>

            <TabPanel value={selectedIdx} index={1} pt={0}>
              <DSODataroomView dso={dso} />
            </TabPanel>

            <TabPanel value={selectedIdx} index={2} pt={0}>
              <DSOVideoLinksView dso={dso} />
            </TabPanel>

            <TabPanel value={selectedIdx} index={3} pt={0}>
              <DSOFAQsView dso={dso} />
            </TabPanel>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
