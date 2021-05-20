import React from 'react'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { PastOrderTable } from 'app/pages/exchange/market/components/PastOrderTable/PastOrderTable'

const meta: Meta = {
  title: 'Pages/Market/PastOrderTable',
  component: PastOrderTable
}

export default meta

const Template: Story = () => {
  return (
    <Form>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PastOrderTable pairId={'60a2340a804b8f3de6248b56'} />
        </Grid>
      </Grid>
    </Form>
  )
}
export const Default = Template.bind({})
