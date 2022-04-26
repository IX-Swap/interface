import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TrackingPrice } from 'app/pages/invest/components/LiveTrackingPrice/TrackingPrice'
import { Box, Grid } from '@mui/material'

const meta: Meta = {
  title: 'Pages/Invest/TrackingPrice',
  component: TrackingPrice
}

export default meta

const Template: Story = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Box width={290}>
          <TrackingPrice price={9843.21} trend='up' />
        </Box>
      </Grid>
      <Grid item>
        <Box width={290}>
          <TrackingPrice price={9843.21} trend='down' />
        </Box>
      </Grid>
    </Grid>
  )
}

export const Default = Template.bind({})
