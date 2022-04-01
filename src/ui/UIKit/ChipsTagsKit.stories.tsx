import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ChipsTagsKit } from './ChipsTagsKit'

const story: Meta = {
  title: 'UI Kit/ChipsTags',
  component: ChipsTagsKit
}

export default story

const Template: Story = () => <ChipsTagsKit />

export const Default = Template.bind({})
