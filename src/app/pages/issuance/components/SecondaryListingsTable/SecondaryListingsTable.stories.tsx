import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { SecondaryListingsTable } from 'app/pages/issuance/components/SecondaryListingsTable/SecondaryListingsTable'

const meta: Meta = {
  title: 'Pages/Market/SecondaryListingsTable',
  component: SecondaryListingsTable
}

export default meta

const Template: Story = () => {
  return (
    <Form>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SecondaryListingsTable />
        </Grid>
      </Grid>
    </Form>
  )
}
export const Default = Template.bind({})
