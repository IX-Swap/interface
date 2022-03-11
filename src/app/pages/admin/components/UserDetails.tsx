import React from 'react'
import { Grid, Typography } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { getTimeFromNow, formatDateToMMDDYY } from 'helpers/dates'
import { UserActions } from 'app/pages/admin/components/UserActions'
import { hasValue } from 'helpers/forms'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'

export interface UserDetailsProps {
  data: ManagedUser
}

export const UserDetails = ({ data }: UserDetailsProps) => {
  const isActive = isResetActive(
    data.isResetActive,
    new Date(data.resetExpiresOn ?? '')
  )
  const hasResetDate = hasValue(data.resetExpiresOn)

  const resetStatus = isActive ? (
    <Typography component='span' color='error'>
      Active
    </Typography>
  ) : (
    'Inactive'
  )

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
                value={formatDateToMMDDYY(data.createdAt)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Last Updated Date'
                value={formatDateToMMDDYY(data.updatedAt)}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Reset Status'
                value={hasResetDate ? resetStatus : '-'}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <LabelledValue
                label='Reset Expires on'
                value={
                  hasResetDate
                    ? getTimeFromNow(new Date(data.resetExpiresOn ?? ''))
                    : '-'
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
