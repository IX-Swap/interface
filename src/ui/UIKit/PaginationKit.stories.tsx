import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { PaginationKit } from 'ui/UIKit/PaginationKit'

const story: Meta = {
  title: 'UI Kit/PaginationKit',
  component: PaginationKit
}

export default story

const Template: Story = () => <PaginationKit />

export const Default = Template.bind({})
