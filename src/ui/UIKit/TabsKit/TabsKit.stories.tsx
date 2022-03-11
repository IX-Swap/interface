import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { TabsKit } from './TabsKit'

const story: Meta = {
  title: 'UI Kit/TabsKit',
  component: TabsKit
}

export default story

const Template: Story = () => <TabsKit />

export const Default = Template.bind({})
