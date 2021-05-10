import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { LiveTrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice'
import { Box, Grid } from '@material-ui/core'

const meta: Meta = {
  title: 'Pages/Invest/LiveTrackingPrice',
  component: LiveTrackingPrice
}

export default meta

const Template: Story = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Box width={290}>
          <LiveTrackingPrice price={9843.21} trend='up' />
        </Box>
      </Grid>
      <Grid item>
        <Box width={290}>
          <LiveTrackingPrice price={9843.21} trend='down' />
        </Box>
      </Grid>
    </Grid>
  )
}

export const Default = Template.bind({})
