import React from 'react'
import { FormControlLabel, Grid, Typography } from '@material-ui/core'
import { useNotificationsFilter } from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationFilter } from 'v2/types/app'
import { BigCheckbox } from 'v2/app/components/BigCheckbox'
import { formatCamelCasedWithSpaces } from 'v2/helpers/strings'

export const NotificationsFilter = () => {
  const { filter, handleClick } = useNotificationsFilter()

  return (
    <Grid container spacing={2} style={{ paddingTop: 70 }}>
      <Grid item xs={12} style={{ padding: '0 32px' }}>
        <Typography variant='h6'>FILTERS</Typography>
      </Grid>
      <Grid item xs={12} style={{ padding: '4px 36px' }}>
        {Object.entries(NotificationFilter).map(([key, value]) => (
          <Grid item key={key}>
            <FormControlLabel
              label={formatCamelCasedWithSpaces(key)}
              labelPlacement='end'
              checked={filter.includes(value)}
              onChange={() => handleClick(value)}
              control={<BigCheckbox />}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
