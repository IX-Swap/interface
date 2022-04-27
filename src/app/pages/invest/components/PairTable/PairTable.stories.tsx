import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import { PairTable } from 'app/pages/invest/components/PairTable/PairTable'
import { Pair } from 'app/pages/invest/hooks/useMarketList'

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
      latestPrice: 1000,
      _24hChangePercentage: -2.3,
      isFavorite: true
    },
    {
      _id: '60a2340a804b8f3de6248b56',
      name: 'EUR/SGD',
      latestPrice: 230,
      _24hChangePercentage: 1.3,
      isFavorite: false
    }
  ]
  return (
    <Box width={350}>
      <PairTable data={data} loadMore={() => {}} />
    </Box>
  )
}

export const Default = Template.bind({})
