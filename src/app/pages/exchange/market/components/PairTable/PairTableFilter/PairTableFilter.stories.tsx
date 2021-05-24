import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box } from '@material-ui/core'
import { PairTableFilter } from 'app/pages/exchange/market/components/PairTable/PairTableFilter/PairTableFilter'

const meta: Meta = {
  title: 'Pages/Market/PairTable/PairTableFilter',
  component: PairTableFilter
}

export default meta

const Template: Story = () => {
  return (
    <Box width={350}>
      <PairTableFilter />
    </Box>
  )
}

export const Default = Template.bind({})
