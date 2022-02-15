import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ColorKit } from './ColorKit'

const story: Meta = {
  title: 'UI Kit/Color',
  component: ColorKit
}

export default story

const Template: Story = () => <ColorKit />

export const Default = Template.bind({})
