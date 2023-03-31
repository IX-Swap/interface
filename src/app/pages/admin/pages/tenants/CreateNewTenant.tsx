import React from 'react'
import { TenantForm } from './components/TenantForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
// import { useParams } from 'react-router-dom'
// import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'

export const CreateNewTenant = () => {
  //   const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  //   const { isLoading } = useDSOById(dsoId, issuerId)

  //   if (isLoading) {
  //     return null
  //   }

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Create New Tenant' />
      </Grid>
      <RootContainer>
        <Grid item>
          <TenantForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
