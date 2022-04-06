import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { HeaderWrapper } from 'app/components/NewHeader/HeaderWrapper'

const story: Meta = {
  title: 'UI Kit/NewHeader',
  component: HeaderWrapper
}

export default story

const Template: Story = () => <HeaderWrapper />

export const Default = Template.bind({})
