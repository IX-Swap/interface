import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { OrderBook } from 'app/pages/invest/components/OrderBook/OrderBook'
import { Box, Grid } from '@material-ui/core'

const meta: Meta = {
  title: 'Pages/Invest/OrderBook',
  component: OrderBook
}

export default meta

const Template: Story = () => {
  const data = [
    {
      price: 123.14,
      amount: 1500.14,
      total: 3000.14
    },
    {
      price: 456.14,
      amount: 1200.14,
      total: 3000.14
    },
    {
      price: 789.14,
      amount: 2500.14,
      total: 3000.14
    },
    {
      price: 789.14,
      amount: 2900.14,
      total: 3000.14
    }
  ]
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Box width={290}>
          <OrderBook
            data={data}
            showHeader
            tokenSymbol='IXPS'
            currency='SGD'
            transaction='sell'
          />
        </Box>
      </Grid>
      <Grid item>
        <Box width={290}>
          <OrderBook
            data={data}
            tokenSymbol='IXPS'
            currency='SGD'
            transaction='buy'
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export const Default = Template.bind({})
