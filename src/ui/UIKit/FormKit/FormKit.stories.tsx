import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { FormKit } from './FormKit'

const story: Meta = {
  title: 'UI Kit/Form',
  component: FormKit
}

export default story

const Template: Story = () => <FormKit />

export const Default = Template.bind({})
