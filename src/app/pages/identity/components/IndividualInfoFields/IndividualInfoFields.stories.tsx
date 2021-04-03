import React from 'react'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'

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
