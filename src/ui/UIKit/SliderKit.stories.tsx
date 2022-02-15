import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SliderKit } from 'ui/UIKit/SliderKit'

const story: Meta = {
  title: 'UI Kit/SliderKit',
  component: SliderKit
}

export default story

const Template: Story = () => <SliderKit />

export const Default = Template.bind({})
