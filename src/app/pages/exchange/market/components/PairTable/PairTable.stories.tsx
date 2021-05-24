import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box } from '@material-ui/core'
import { PairTable } from 'app/pages/exchange/market/components/PairTable/PairTable'
import { Pair } from 'app/pages/exchange/market/hooks/useMarketList'

const meta: Meta = {
  title: 'Pages/Market/PairTable',
  component: PairTable
}

export default meta

const Template: Story = () => {
  const data: Pair[] = [
    {
      _id: '60a723d4bb71587cc1d144e6',
      name: 'PATTI OSINSKI',
      lastPrice: 1000,
      change: 3.45,
      trend: 'up',
      isFavorite: true
    },
    {
      _id: '60a2340a804b8f3de6248b56',
      name: 'EUR/SGD',
      lastPrice: 230,
      change: 6.78,
      trend: 'down',
      isFavorite: false
    }
  ]
  return (
    <Box width={350}>
      <PairTable data={data} />
    </Box>
  )
}

export const Default = Template.bind({})
