import React, { Fragment, useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import { TabPanel } from 'components/TabPanel'
import useStyles from './TableTabsView.styles'

export interface TabsContent {
  panel: React.ReactNode
  label: string
}

export interface TableTabsViewProps {
  tabs: TabsContent[]
}

export const TableTabsView = ({ tabs }: TableTabsViewProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const classes = useStyles()

  return (
    <Fragment>
      <Tabs
        classes={{ indicator: classes.indicator }}
        value={activeTab}
        onChange={(_, index) => setActiveTab(index)}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            classes={{
              root: classes.tabRoot,
              selected: classes.tabRootSelected
            }}
            label={tab.label}
          />
        ))}
      </Tabs>

      <Box className={classes.content}>
        {tabs.map((tab, index) => (
          <TabPanel index={index} key={index} value={activeTab}>
            {tab.panel}
          </TabPanel>
        ))}
      </Box>
    </Fragment>
  )
}
