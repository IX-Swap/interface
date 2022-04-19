import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { TablesKit } from 'ui/UIKit/TablesKit/TablesKit'

const story: Meta = {
  title: 'UI Kit/TablesKit',
  component: TablesKit
}

export default story

const Template: Story = () => <TablesKit />

export const Default = Template.bind({})
