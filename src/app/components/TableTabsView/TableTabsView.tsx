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
  onChange?: () => void
}

export const TableTabsView = ({ tabs, onChange }: TableTabsViewProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const classes = useStyles()

  const handleChange = (_: React.ChangeEvent<{}>, index: number) => {
    setActiveTab(index)
    onChange?.()
  }

  return (
    <Fragment>
      <Tabs
        classes={{ indicator: classes.indicator }}
        value={activeTab}
        onChange={handleChange}
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
