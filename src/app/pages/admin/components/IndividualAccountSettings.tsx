import React from 'react'
import { Tabs, Tab, Box, Grid } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { AccountLoginHistory } from 'app/pages/admin/components/AccountLoginHistory'
import { useIndividualAccountSettings } from 'app/pages/admin/hooks/useIndividualAccountSettings'
import { useStyles } from './UserDetails.styles'
import { RevokeAccess } from 'app/pages/admin/components/RevokeAccess'

export interface IndividualAccountSettingsProps {
  activeRoles: string[]
}

export const IndividualAccountSettings = ({
  activeRoles
}: IndividualAccountSettingsProps) => {
  const { value, handleChange } = useIndividualAccountSettings(0)
  const classes = useStyles()
  const { tabBarStyle, gridPadding } = classes

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        className={tabBarStyle}
      >
        <Tab label='Login History' />
        <Tab label='Revoke Access' />
        {/* <Tab label='Role Management' /> */}
      </Tabs>
      {/* <VSpacer size='medium' /> */}
      <Grid className={gridPadding}>
        <TabPanel value={value} index={0}>
          <AccountLoginHistory />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RevokeAccess />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <RoleManagement activeRoles={activeRoles} />
        </TabPanel> */}
      </Grid>
    </Box>
  )
}
