import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ButtonKit } from './ButtonKit'

const story: Meta = {
  title: 'UI Kit/ButtonKit',
  component: ButtonKit
}

export default story

const Template: Story = () => <ButtonKit />

export const Default = Template.bind({})
