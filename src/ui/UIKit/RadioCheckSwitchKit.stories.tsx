import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { RadioCheckSwitchKit } from './RadioCheckSwitchKit'

const story: Meta = {
  title: 'UI Kit/RadioCheckSwitchKit',
  component: RadioCheckSwitchKit
}

export default story

const Template: Story = () => <RadioCheckSwitchKit />

export const Default = Template.bind({})
