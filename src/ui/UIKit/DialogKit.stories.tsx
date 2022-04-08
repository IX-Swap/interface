import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { DialogKit } from './DialogKit'

const story: Meta = {
  title: 'UI Kit/Dialog',
  component: DialogKit
}

export default story

const Template: Story = () => <DialogKit />

export const Default = Template.bind({})
