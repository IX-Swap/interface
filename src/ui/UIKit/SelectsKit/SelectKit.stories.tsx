import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { SelectKit } from 'ui/UIKit/SelectsKit/SelectKit'

const story: Meta = {
  title: 'UI Kit/SelectKit',
  component: SelectKit
}

export default story

const Template: Story = () => <SelectKit />

export const Default = Template.bind({})
