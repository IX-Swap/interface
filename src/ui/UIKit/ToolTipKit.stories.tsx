import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ToolTipKit } from './ToolTipKit'

const story: Meta = {
  title: 'UI Kit/ToolTip',
  component: ToolTipKit
}

export default story

const Template: Story = () => <ToolTipKit />

export const Default = Template.bind({})
