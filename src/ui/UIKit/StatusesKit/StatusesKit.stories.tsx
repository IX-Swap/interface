import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { StatusesKit } from 'ui/UIKit/StatusesKit/StatusesKit'

const story: Meta = {
  title: 'UI Kit/Statuses',
  component: StatusesKit
}

export default story

const Template: Story = () => <StatusesKit />

export const Default = Template.bind({})
