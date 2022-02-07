import React, { Fragment, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import useStyles from './VirtualAccountsTabView.styles'
import { AssignedVirtualAccountsTable } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import { UnassignedAccountsTable } from 'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountsTable'

export const VirtualAccountsTabView = () => {
  const [activeTab, setActiveTab] = useState(0)
  const classes = useStyles()

  return (
    <Fragment>
      <Tabs
        classes={{ indicator: classes.indicator }}
        value={activeTab}
        onChange={(_, index) => setActiveTab(index)}
      >
        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Assigned to Investors'
        />

        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Assigned to Issuers'
        />

        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Available Accounts'
        />

        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Virtual Accounts list'
        />
      </Tabs>

      <Box className={classes.content}>
        <TabPanel index={0} value={activeTab}>
          <AssignedVirtualAccountsTable role='investor' />
        </TabPanel>

        <TabPanel index={1} value={activeTab}>
          <AssignedVirtualAccountsTable role='issuer' />
        </TabPanel>

        <TabPanel index={2} value={activeTab}>
          <UnassignedAccountsTable />
        </TabPanel>

        <TabPanel index={3} value={activeTab}>
          <AssignedVirtualAccountsTable />
        </TabPanel>
      </Box>
    </Fragment>
  )
}
