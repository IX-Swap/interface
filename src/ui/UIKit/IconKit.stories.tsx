import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { IconKit } from 'ui/UIKit/IconKit'

const story: Meta = {
  title: 'UI Kit/Icon',
  component: IconKit
}

export default story

const Template: Story = () => <IconKit />

export const Default = Template.bind({})
