import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { AgreementsAndDisclosuresFields } from './AgreementsAndDisclosuresFields'

const meta: Meta = {
  title: 'Pages/Identity/AgreementsAndDisclosuresFields',
  component: AgreementsAndDisclosuresFields
}

export default meta

const Template: Story = () => (
  <Form>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AgreementsAndDisclosuresFields />
      </Grid>
    </Grid>
  </Form>
)

export const Default = Template.bind({})
