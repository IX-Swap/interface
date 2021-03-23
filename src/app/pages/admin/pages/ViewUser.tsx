import React from 'react'
import { Grid } from '@material-ui/core'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { UserDetails } from 'app/pages/admin/components/UserDetails'
import { UserStatus } from 'app/pages/admin/components/UserStatus'
import { IndividualAccountSettings } from 'app/pages/admin/components/IndividualAccountSettings'
import { useParams } from 'react-router'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const ViewUser: React.FC = () => {
  const params = useParams<{ userId: string }>()
  const { data, isLoading } = useUserById(params.userId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container item direction='column'>
      <Grid item>
        <PageHeader title={data.name} />
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <UserDetails data={data} />
          </Grid>
          <Grid item xs={12} md={4}>
            <UserStatus data={data} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IndividualAccountSettings activeRoles={data.roles.split(',')} />
      </Grid>
    </Grid>
  )
}
