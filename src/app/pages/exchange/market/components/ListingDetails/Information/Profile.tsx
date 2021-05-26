import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { renderStringToHTML } from 'app/components/DSO/utils'
import React from 'react'

export const Profile = () => {
  return (
    <Grid direction='column' container spacing={2}>
      <Grid item>
        <FormSectionHeader title='Information Profile' />
      </Grid>
      <Grid item>{renderStringToHTML('')}</Grid>
    </Grid>
  )
}
