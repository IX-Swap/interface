import React from 'react'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'

export const CreateDSO = () => {
  const breadcrumbCtx = useBreadcrumbs()
  breadcrumbCtx.rename('Create DSO')

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Create Digital Security Offering' />
      </Grid>
      <RootContainer>
        <Grid item>
          <DSOForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
