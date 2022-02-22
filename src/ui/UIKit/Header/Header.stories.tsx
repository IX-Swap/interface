import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Header } from 'ui/UIKit/Header/Header'

const story: Meta = {
  title: 'UI Kit/Header',
  component: Header
}

export default story

const Template: Story = () => <Header />

export const Default = Template.bind({})
