import React, { Fragment, useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import { TabPanel } from 'components/TabPanel'
import useStyles from './TableTabsView.styles'

export interface TabsContent {
  panel: React.ReactNode
  label: React.ReactNode
  disabled?: boolean
  component?: React.ReactNode
}

export interface TableTabsViewProps {
  tabs: TabsContent[]
  onChange?: (event: object, value: any) => void
  variant?: 'primary' | 'secondary'
}

export const TableTabsView = ({
  tabs,
  onChange,
  variant = 'primary'
}: TableTabsViewProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const classes = useStyles({ variant })

  const handleChange = (event: React.ChangeEvent<{}>, index: number) => {
    setActiveTab(index)
    onChange?.(event, index)
  }

  return (
    <Fragment>
      <Tabs
        classes={{ indicator: classes.indicator, root: classes.tabsRoot }}
        value={activeTab}
        onChange={handleChange}
      >
        {tabs.map(({ label, disabled, component }, index) =>
          component !== undefined ? (
            <Box key={index}>{component}</Box>
          ) : (
            <Tab
              key={index}
              classes={{
                root: classes.tabRoot,
                selected: classes.tabRootSelected
              }}
              disabled={disabled}
              label={label}
            />
          )
        )}
      </Tabs>

      <Box className={classes.content}>
        {tabs.map((tab, index) => (
          <TabPanel
            index={index}
            key={index}
            value={activeTab}
            withoutSpacing={variant !== 'primary'}
          >
            {tab.panel}
          </TabPanel>
        ))}
      </Box>
    </Fragment>
  )
}
