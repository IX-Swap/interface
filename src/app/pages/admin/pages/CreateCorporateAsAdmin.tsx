import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { AdminCorporateInvestorForm } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateInvestorForm'
import { useParams } from 'react-router-dom'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const CreateCorporateAsAdmin = () => {
  const params = useParams<{ userId: string }>()
  const { data, isLoading } = useUserById(params.userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={data.name} />
      </Grid>
      <RootContainer>
        <Grid container item>
          <VSpacer size='medium' />
        </Grid>
        <Grid item>
          <AdminCorporateInvestorForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
