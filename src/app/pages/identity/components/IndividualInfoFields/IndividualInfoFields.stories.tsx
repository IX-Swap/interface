import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

const meta: Meta = {
  title: 'Pages/Identity/IndividualInfoFields',
  component: IndividualInfoFields
}

export default meta

const Template: Story = () => (
  <Form>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormSectionHeader title='Personal Information' />
        <IndividualInfoFields />
      </Grid>
    </Grid>
  </Form>
)

export const Default = Template.bind({})
