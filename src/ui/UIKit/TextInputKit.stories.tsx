import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { TextInputKit } from './TextInputKit/TextInputKit'

const story: Meta = {
  title: 'UI Kit/TextField',
  component: TextInputKit
}

export default story

const Template: Story = () => <TextInputKit />

export const Default = Template.bind({})
