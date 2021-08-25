import React, { Fragment, useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import { TabPanel } from 'components/TabPanel'
import useStyles from './VirtualAccountsAuditTabView.styles'
import { EODMT940Table } from 'app/pages/admin/components/EODMT940Table/EODMT940Table'
import { InterimMT942Table } from 'app/pages/admin/components/InterimMT942Table/InterimMT942Table'

export const VirtualAccountsAuditTabView = () => {
  const [activeTab, setActiveTab] = useState(0)
  const classes = useStyles()

  return (
    <Fragment>
      <Tabs
        textColor={'primary'}
        indicatorColor={'primary'}
        value={activeTab}
        onChange={(_, index) => setActiveTab(index)}
      >
        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='EOD MT 940'
        />

        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Interim MT 942'
        />

        <Tab
          classes={{ root: classes.tabRoot, selected: classes.tabRootSelected }}
          label='Outbound'
        />
      </Tabs>

      <Box>
        <TabPanel index={0} value={activeTab}>
          <EODMT940Table />
        </TabPanel>

        <TabPanel index={1} value={activeTab}>
          <InterimMT942Table />
        </TabPanel>

        <TabPanel index={2} value={activeTab}>
          Outbound table
        </TabPanel>
      </Box>
    </Fragment>
  )
}
