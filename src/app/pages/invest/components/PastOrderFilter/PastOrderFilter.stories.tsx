import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { PastOrderFilter } from 'app/pages/invest/components/PastOrderFilter/PastOrderFilter'

const meta: Meta = {
  title: 'Pages/Market/PastOrderFilter',
  component: PastOrderFilter
}

export default meta

const Template: Story = () => {
  return (
    <Form>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PastOrderFilter />
        </Grid>
      </Grid>
    </Form>
  )
}
export const Default = Template.bind({})
