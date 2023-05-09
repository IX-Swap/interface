import { Box, Tab, Tabs } from '@mui/material'
import { Information } from 'app/pages/issuance/components/ListingDetails/Information/Information'
import { Overview } from 'app/pages/issuance/components/ListingDetails/Overview/Overview'
import { TabPanel } from 'components/TabPanel'
import React, { useState } from 'react'
import { ListingView } from 'types/listing'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useStyles } from './DetailsTab.styles'

export interface DetailsTabProps {
  data: ListingView
}

export const DetailsTab = ({ data }: DetailsTabProps) => {
  const { tabs } = useStyles()
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <FieldContainer
        sx={{ marginBottom: '-8px', px: 2, py: 1, borderRadius: 2 }}
      >
        <Tabs value={tabValue} onChange={handleChange} className={tabs}>
          <Tab label='Overview' />
          <Tab label='Information' />
        </Tabs>
      </FieldContainer>
      <Box sx={{ paddingLeft: '25px' }}>
        <TabPanel index={0} value={tabValue}>
          <Overview data={data} />
        </TabPanel>
        <TabPanel index={1} value={tabValue}>
          <Information data={data} />
        </TabPanel>
      </Box>
    </>
  )
}
