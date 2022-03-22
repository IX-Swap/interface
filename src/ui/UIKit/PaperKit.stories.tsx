import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { PaperKit } from 'ui/UIKit/PaperKit'

const story: Meta = {
  title: 'UI Kit/Paper',
  component: PaperKit
}

export default story

const Template: Story = () => <PaperKit />

export const Default = Template.bind({})
