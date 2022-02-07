import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { OrderBook } from 'app/pages/exchange/components/OrderBook/OrderBook'
import { Box, Grid } from '@mui/material'
import { orderBookData } from '__fixtures__/exchange'

const meta: Meta = {
  title: 'Pages/Invest/OrderBook',
  component: OrderBook
}

export default meta

const Template: Story = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Box width={290}>
          <OrderBook
            data={orderBookData.asks}
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
            data={orderBookData.bids}
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
