import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MyListingsTable } from 'app/pages/issuance/components/MyListingsTable/MyListingsTable'

const meta: Meta = {
  title: 'Pages/Market/MyListingsTable',
  component: MyListingsTable
}

export default meta

const Template: Story = () => {
  return (
    <Form>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MyListingsTable />
        </Grid>
      </Grid>
    </Form>
  )
}
export const Default = Template.bind({})
