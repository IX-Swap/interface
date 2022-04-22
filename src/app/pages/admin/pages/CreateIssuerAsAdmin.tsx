import { Grid } from '@mui/material'
import { AdminCorporateIssuerForm } from 'app/pages/admin/components/AdminCorporateIssuerForm/AdminCorporateIssuerForm'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'
import { useUserById } from 'app/pages/admin/hooks/useUserById'

export const CreateIssuerAsAdmin = () => {
  const params = useParams<{ userId: string }>()
  const { data, isLoading } = useUserById(params.userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title={data.name} />
      </Grid>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <AdminCorporateIssuerForm />
      </Grid>
    </Grid>
  )
}
