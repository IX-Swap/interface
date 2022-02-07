import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { InvestorDeclarationForm } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorDeclarationForm'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'

const meta: Meta = {
  title: 'Pages/Identity/InvestorDeclarationForm',
  component: InvestorDeclarationForm
}

export default meta

const Template: Story = () => {
  return (
    <Form>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <InvestorDeclarationForm />
        </Grid>
      </Grid>
    </Form>
  )
}
export const Default = Template.bind({})
