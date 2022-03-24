import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { DatepickerKit } from './DatepickerKit'

const story: Meta = {
  title: 'UI Kit/DateTime',
  component: DatepickerKit
}

export default story

const Template: Story = () => <DatepickerKit />

export const Default = Template.bind({})
