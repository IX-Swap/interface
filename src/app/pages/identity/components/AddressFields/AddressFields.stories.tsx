import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'

const meta: Meta = {
  title: 'Pages/Identity/AddressFields',
  component: AddressFields
}

export default meta

const Template: Story = () => (
  <Form>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormSectionHeader title='Address' />
        <AddressFields />
      </Grid>
    </Grid>
  </Form>
)

export const Default = Template.bind({})
