import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { TypographyKit } from './TypographyKit'

const story: Meta = {
  title: 'UI Kit/Typography',
  component: TypographyKit
}

export default story

const Template: Story = () => <TypographyKit />

export const Default = Template.bind({})
