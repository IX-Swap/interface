import React from 'react'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'

export const CreateDSO = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Create DSO' />
      </Grid>
      <RootContainer>
        <Grid item>
          <DSOForm isNew />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
