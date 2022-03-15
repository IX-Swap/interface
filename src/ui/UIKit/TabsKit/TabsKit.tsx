import React from 'react'
import { ContainedTabDemo } from 'ui/UIKit/TabsKit/ContainedTabDemo'
import { TabDemo } from 'ui/UIKit/TabsKit/TabDemo'
import { UIKitThemeWrapper } from '../UIKitThemeWrapper'

export const TabsKit = () => {
  return (
    <UIKitThemeWrapper>
      <TabDemo />
      <ContainedTabDemo />
    </UIKitThemeWrapper>
  )
}
