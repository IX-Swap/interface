import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { AdminIndividualInvestorForm } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'
import { useUserById } from 'app/pages/admin/hooks/useUserById'

export const CreateIndividualAsAdmin: React.FC = () => {
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
        <AdminIndividualInvestorForm />
      </Grid>
    </Grid>
  )
}
