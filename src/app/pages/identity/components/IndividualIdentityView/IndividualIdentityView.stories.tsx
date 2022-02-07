import React from 'react'
import { Grid } from '@mui/material'
import { Meta, Story } from '@storybook/react/types-6-0'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { individual } from '__fixtures__/identity'

const meta: Meta = {
  title: 'Pages/Identity/IndividualIdentityView',
  component: IndividualIdentityView
}

export default meta

const Template: Story = () => (
  <Grid container>
    <Grid item>
      <IndividualIdentityView data={individual} />
    </Grid>
  </Grid>
)

export const Default = Template.bind({})
