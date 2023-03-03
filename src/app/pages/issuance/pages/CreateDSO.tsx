import React from 'react'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'

export const CreateDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading } = useDSOById(dsoId, issuerId)
  const breadcrumbCtx = useBreadcrumbs()
  breadcrumbCtx.rename('Create STO')
  if (isLoading) {
    return null
  }

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Create Security Token Offering' />
      </Grid>
      <RootContainer>
        <Grid item>
          <DSOForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
