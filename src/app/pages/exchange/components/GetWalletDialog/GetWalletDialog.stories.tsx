import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { Meta, Story } from '@storybook/react/types-6-0'
import { GetWalletDialog } from './GetWalletDialog'

const meta: Meta = {
  title: 'Pages/Market/GetWalletDialog',
  component: GetWalletDialog
}

export default meta

const Template: Story = () => {
  return (
    <Form>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <GetWalletDialog open={true} toggleOpen={() => {}} />
        </Grid>
      </Grid>
    </Form>
  )
}
export const Default = Template.bind({})
