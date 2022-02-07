import React from 'react'
import { FormControlLabel, Grid, Typography } from '@mui/material'
import { useNotificationsFilter } from 'app/pages/notifications/hooks/useNotificationsFilter'
import { NotificationFilterFeatures } from 'types/app'
import { BigCheckbox } from 'app/components/BigCheckbox'
import { formatCamelCasedWithSpaces } from 'helpers/strings'
import { SidebarTitle } from 'ui/Sidebar/SidebarTitle'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'

export const NotificationsFilter = () => {
  const { filter, handleClick } = useNotificationsFilter()

  return (
    <>
      <SidebarTitle>
        <Typography variant='h6'>FILTERS</Typography>
      </SidebarTitle>

      <SidebarSection padded>
        {Object.entries(NotificationFilterFeatures).map(([key, value]) => (
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
      </SidebarSection>
    </>
  )
}
