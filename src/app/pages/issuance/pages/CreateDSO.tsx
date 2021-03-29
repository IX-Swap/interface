import React from 'react'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@material-ui/core'

export const CreateDSO = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Create DSO' />
      </Grid>
      <Grid item>
        <DSOForm isNew />
      </Grid>
    </Grid>
  )
}
