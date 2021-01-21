import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateAndTime, getTimeFromNow } from 'helpers/dates'
import { User } from 'app/pages/admin/hooks/useUserById'
import { UserActions } from 'app/pages/admin/components/UserActions'
import { hasValue } from 'helpers/forms'

export interface UserDetails {
  data: User
}

export const UserDetails = ({ data }: UserDetails) => {
  const isActive =
    data.isResetActive && new Date(data.resetExpiresOn ?? '') > new Date()
  const hasResetDate = hasValue(data.resetExpiresOn)

  return (
    <>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h3'>{data.email}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Roles'
                value={data.roles.split(',').join(', ')}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LabelledValue label='Name' value={data.name} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Account Creation Date'
                value={getTimeFromNow(new Date(data.createdAt))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Last Updated Date'
                value={getTimeFromNow(new Date(data.updatedAt))}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Reset Status'
                value={hasResetDate ? (isActive ? 'Active' : 'Inactive') : '-'}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Reset Expires on'
                value={
                  hasResetDate ? formatDateAndTime(data.resetExpiresOn) : '-'
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <UserActions data={data} />
        </Grid>
      </Grid>
    </>
  )
}
