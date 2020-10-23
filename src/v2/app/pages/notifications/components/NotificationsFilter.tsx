import React from 'react'
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import { useNotificationsFilter } from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationFilter } from 'v2/types/app'

export const NotificationsFilter = () => {
  const { filter, handleClick } = useNotificationsFilter()

  return (
    <Grid container spacing={2} style={{ paddingTop: 70 }}>
      <Grid item xs={12} style={{ padding: '0 32px' }}>
        <Typography variant='h6'>FILTERS</Typography>
      </Grid>
      <Grid item xs={12} style={{ padding: '2px 32px' }}>
        {Object.entries(NotificationFilter).map(([key, value]) => (
          <Grid item key={key}>
            <FormControlLabel
              label={key}
              labelPlacement='end'
              checked={filter.includes(value)}
              onClick={() => handleClick(value)}
              control={<Checkbox size='medium' />}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
