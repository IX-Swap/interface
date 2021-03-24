import React from 'react'
import { Grid } from '@material-ui/core'
import { Meta, Story } from '@storybook/react/types-6-0'
import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'

const meta: Meta = {
  title: 'Pages/Identity/IndividualIdentityView',
  component: IndividualIdentityView
}

export default meta

const Template: Story = () => (
  <Grid container>
    <Grid item>
      <IndividualIdentityView />
    </Grid>
  </Grid>
)

export const Default = Template.bind({})
