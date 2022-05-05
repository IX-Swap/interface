import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { OTPInputKit } from 'ui/UIKit/OTPInputKit/OTPInputKit'

const story: Meta = {
  title: 'UI Kit/OTPInputKit',
  component: OTPInputKit
}

export default story

const Template: Story = () => <OTPInputKit />

export const Default = Template.bind({})
