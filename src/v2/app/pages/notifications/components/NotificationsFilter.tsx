import React from 'react'
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import { useNotificationsFilter } from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { AppFeature } from 'v2/types/app'
import { VSpacer } from 'v2/components/VSpacer'

export const NotificationsFilter = () => {
  const { filter, handleClick } = useNotificationsFilter()

  const features = [
    'logins',
    'bank-accounts',
    'deposits',
    'digital-security-withdrawals',
    'withdrawals',
    'corporates',
    'individuals',
    'commitments',
    'offerings',
    'deployments'
  ]

  return (
    <Grid container direction='column'>
      <VSpacer size='small' />
      <Typography variant='h6'>Filters</Typography>
      <VSpacer size='small' />
      {Object.entries(AppFeature).map(([key, value]) => {
        if (!features.includes(value)) return null

        return (
          <Grid item key={key}>
            <FormControlLabel
              label={key}
              checked={filter.includes(value)}
              onClick={() => handleClick(value)}
              control={<Checkbox size='medium' />}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
