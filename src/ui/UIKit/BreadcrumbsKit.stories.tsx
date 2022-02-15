import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { BreadcrumbsKit } from './BreadcrumbsKit'

const story: Meta = {
  title: 'UI Kit/BreadcrumbsKit',
  component: BreadcrumbsKit
}

export default story

const Template: Story = () => <BreadcrumbsKit />

export const Default = Template.bind({})
