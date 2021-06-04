import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TVChartContainer } from './TVChartContainer'

const meta: Meta = {
  title: 'Pages/Invest/TVChartContainer',
  component: TVChartContainer
}

export default meta

const Template: Story = () => {
  return <TVChartContainer />
}

export const Default = Template.bind({})
