import React from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { TabPanel } from 'app/pages/admin/components/TabPanel'
import { AccountLoginHistory } from 'app/pages/admin/components/AccountLoginHistory'
import { VSpacer } from 'components/VSpacer'
import { useIndividualAccountSettings } from 'app/pages/admin/hooks/useIndividualAccountSettings'
import { RoleManagement } from 'app/pages/admin/components/RoleManagement'
import { useStyles } from 'app/pages/admin/components/IndividualAccountSettings.style'
import { RevokeAccess } from 'app/pages/admin/components/RevokeAccess'

export interface IndividualAccountSettingsProps {
  activeRoles: string[]
}

export const IndividualAccountSettings = ({
  activeRoles
}: IndividualAccountSettingsProps) => {
  const { value, handleChange } = useIndividualAccountSettings(0)

  const { tab } = useStyles()

  return (
    <Box paddingY={10}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        className={tab}
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
        <RevokeAccess />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RoleManagement activeRoles={activeRoles} />
      </TabPanel>
    </Box>
  )
}
