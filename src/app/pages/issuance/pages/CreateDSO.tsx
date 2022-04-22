import React from 'react'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { Grid } from '@mui/material'

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
