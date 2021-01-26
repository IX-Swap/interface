import React from 'react'
import { Grid } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { useAdminRouter } from 'app/pages/admin/router'
import { UserDetails } from 'app/pages/admin/components/UserDetails'
import { UserStatus } from 'app/pages/admin/components/UserStatus'
import { IndividualAccountSettings } from 'app/pages/admin/components/IndividualAccountSettings'

export const ViewUser: React.FC = () => {
  const {
    params: { userId }
  } = useAdminRouter()

  const { data, isLoading } = useUserById(userId)

  useSetPageTitle(data?.name)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container item direction='column'>
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
