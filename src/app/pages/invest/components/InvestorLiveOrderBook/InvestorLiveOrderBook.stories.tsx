import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { Box } from '@material-ui/core'

const meta: Meta = {
  title: 'Pages/Invest/InvestorLiveOrderBook',
  component: InvestorLiveOrderBook
}

export default meta

const Template: Story = () => {
  return (
    <Box width={290}>
      <InvestorLiveOrderBook />
    </Box>
  )
}

export const Default = Template.bind({})
