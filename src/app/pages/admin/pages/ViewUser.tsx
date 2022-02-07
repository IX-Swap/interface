import React from 'react'
import { Grid } from '@mui/material'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { UserDetails } from 'app/pages/admin/components/UserDetails'
import { UserStatus } from 'app/pages/admin/components/UserStatus'
import { IndividualAccountSettings } from 'app/pages/admin/components/IndividualAccountSettings'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { UserIdentitiesStatus } from 'app/pages/admin/components/UserIdentitiesStatus'

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
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <UserStatus data={data} />
              </Grid>
              <Grid item>
                <UserIdentitiesStatus data={data} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IndividualAccountSettings activeRoles={data.roles.split(',')} />
      </Grid>
    </Grid>
  )
}
