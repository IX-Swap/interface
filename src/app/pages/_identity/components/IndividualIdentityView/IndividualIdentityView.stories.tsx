import React from 'react'
import { Grid } from '@material-ui/core'
import { Meta, Story } from '@storybook/react/types-6-0'
import { IndividualIdentityViewContainer } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityViewContainer'

const meta: Meta = {
  title: 'Pages/Identity/IndividualIdentityView',
  component: IndividualIdentityViewContainer
}

export default meta

const Template: Story = () => (
  <Grid container>
    <Grid item>
      <IndividualIdentityViewContainer />
    </Grid>
  </Grid>
)

export const Default = Template.bind({})
