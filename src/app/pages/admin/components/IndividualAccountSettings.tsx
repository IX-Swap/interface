import React from 'react'
import { Tabs, Tab, Box } from '@material-ui/core'
import { TabPanel } from 'app/pages/admin/components/TabPanel'
import { AccountLoginHistory } from 'app/pages/admin/components/AccountLoginHistory'
import { VSpacer } from 'components/VSpacer'
import { useIndividualAccountSettings } from 'app/pages/admin/hooks/useIndividualAccountSettings'

export const IndividualAccountSettings = () => {
  const { value, handleChange } = useIndividualAccountSettings(0)

  return (
    <Box paddingY={10}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        <Tab label='Login History' />
        <Tab label='Revoke Access' />
        <Tab label='Role Management' />
      </Tabs>
      <VSpacer size='medium' />
      <TabPanel value={value} index={0}>
        <AccountLoginHistory />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <></>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <></>
      </TabPanel>
    </Box>
  )
}
