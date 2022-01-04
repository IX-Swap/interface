import React from 'react'
import { TabPanel, TabPanelProps } from './TabPanel'

export const MarketTabPanel = (props: TabPanelProps) => {
  return (
    <TabPanel
      {...props}
      style={{
        minWidth: 'fit-content',
        overflowY: 'scroll',
        maxHeight: '300px'
      }}
    ></TabPanel>
  )
}
