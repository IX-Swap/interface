import { Paper } from '@mui/material'
import React from 'react'
import { ContainedTabDemo } from 'ui/UIKit/TabsKit/ContainedTabDemo'
import { TabDemo } from 'ui/UIKit/TabsKit/TabDemo'
import { UIKitThemeWrapper } from '../UIKitThemeWrapper'

export const TabsKit = () => {
  return (
    <UIKitThemeWrapper>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <TabDemo />
        <ContainedTabDemo />
      </Paper>
    </UIKitThemeWrapper>
  )
}
