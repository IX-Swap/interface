import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import { Trades } from 'app/pages/invest/components/Trades/Trades'

const meta: Meta = {
  title: 'Pages/Invest/Trades',
  component: Trades
}

export default meta

const Template: Story = () => {
  return (
    <Box width={240}>
      <Trades />
    </Box>
  )
}

export const Default = Template.bind({})
