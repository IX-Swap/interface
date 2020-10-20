import React from 'react'
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import { useNotificationsFilter } from 'v2/app/pages/notifications/hooks/useNotificationsFilter'
import { VSpacer } from 'v2/components/VSpacer'
import { NotificationFilter } from 'v2/types/app'

export const NotificationsFilter = () => {
  const { filter, handleClick } = useNotificationsFilter()

  return (
    <Grid container direction='column'>
      <VSpacer size='small' />
      <Typography variant='h6'>Filters</Typography>
      <VSpacer size='small' />
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
  )
}
