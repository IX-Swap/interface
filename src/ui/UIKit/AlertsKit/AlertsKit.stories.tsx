import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AlertsKit } from 'ui/UIKit/AlertsKit/AlertsKit'

const story: Meta = {
  title: 'UI Kit/Alerts',
  component: AlertsKit
}

export default story

const Template: Story = () => <AlertsKit />

export const Default = Template.bind({})
