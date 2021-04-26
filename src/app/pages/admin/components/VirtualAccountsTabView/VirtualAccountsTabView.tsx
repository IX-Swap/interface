import React, { Fragment, useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import { TabPanel } from 'components/TabPanel'
import useStyles from './VirtualAccountsTabView.styles'

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
          label='Assigned Accounts'
        />
        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Unassigned Accounts'
        />
      </Tabs>

      <Box className={classes.content}>
        <TabPanel index={0} value={activeTab}>
          Assigned Accounts Table
        </TabPanel>
      </Box>
    </Fragment>
  )
}
