import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AvatarKit } from './AvatarKit'

const story: Meta = {
  title: 'UI Kit/Avatar',
  component: AvatarKit
}

export default story

const Template: Story = () => <AvatarKit />

export const Default = Template.bind({})
