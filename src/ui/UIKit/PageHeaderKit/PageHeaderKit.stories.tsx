import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { PageHeaderKit } from 'ui/UIKit/PageHeaderKit/PageHeaderKit'

const story: Meta = {
  title: 'UI Kit/PageHeaderKit',
  component: PageHeaderKit
}

export default story

const Template: Story = () => <PageHeaderKit />

export const Default = Template.bind({})
