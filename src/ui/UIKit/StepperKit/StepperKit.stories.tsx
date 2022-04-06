import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { StepperKit } from 'ui/UIKit/StepperKit/StepperKit'

const story: Meta = {
  title: 'UI Kit/StepperKit',
  component: StepperKit
}

export default story

const Template: Story = () => <StepperKit />

export const Default = Template.bind({})
