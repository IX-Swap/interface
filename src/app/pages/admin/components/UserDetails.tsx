import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { getTimeFromNow, formatDateToMMDDYY } from 'helpers/dates'
import { hasValue } from 'helpers/forms'
import { ManagedUser } from 'types/user'
import { isResetActive } from 'helpers/isResetActive'
import { ReactComponent as ApprovedBadge } from 'assets/icons/kyc-accreditation/approved-badge.svg'
import { ReactComponent as AccreditedBadge } from 'assets/icons/kyc-accreditation/accredited-badge.svg'
import { useStyles } from './UserDetails.styles'
import { UserRolesViewStatus } from './UserRolesViewStatus'
import { VSpacer } from 'components/VSpacer'
export interface UserDetailsProps {
  data: ManagedUser
}

export const UserDetails = ({ data }: UserDetailsProps) => {
  const isActive = isResetActive(
    data.isResetActive,
    new Date(data.resetExpiresOn ?? '')
  )
  const hasResetDate = hasValue(data.resetExpiresOn)
  const classes = useStyles()
  const { userName } = classes

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
          <Box className={userName}>
            <Typography variant='h3'>{data?.name}</Typography>
            {data?.verified ? <AccreditedBadge /> : <ApprovedBadge />}
          </Box>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={4} lg={4}>
              <LabelledValue label='Email' value={data.email} />
            </Grid>
            <Grid item xs={4} lg={4}>
              <LabelledValue
                label='Account Creation Date'
                value={formatDateToMMDDYY(data.createdAt)}
              />
            </Grid>
            <Grid item xs={4} lg={4}>
              <LabelledValue
                label='Last Updated Date'
                value={formatDateToMMDDYY(data.updatedAt)}
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
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
            <Grid item xs={12} lg={4}>
              <LabelledValue label='Investor Role' value={'-'} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <UserRolesViewStatus data={data} />
            </Grid>
          </Grid>
        </Grid>
        <VSpacer size='large' />
      </Grid>
    </>
  )
}
