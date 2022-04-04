import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SkeletonKit } from './SkeletonKit'

const story: Meta = {
  title: 'UI Kit/Skeleton',
  component: SkeletonKit
}

export default story

const Template: Story = () => <SkeletonKit />

export const Default = Template.bind({})
