import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TVChartContainer } from './TVChartContainer'
import { IChartingLibraryWidget } from 'types/charting_library/charting_library'

const meta: Meta = {
  title: 'Pages/Invest/TVChartContainer',
  component: TVChartContainer
}

export default meta

const Template: Story = () => {
  const [
    tvWidget,
    setTradingChart
  ] = React.useState<IChartingLibraryWidget | null>(null)
  return (
    <TVChartContainer tvWidget={tvWidget} setTradingChart={setTradingChart} />
  )
}

export const Default = Template.bind({})
