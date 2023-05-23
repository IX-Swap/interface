import React from 'react'
import { FormControlLabel, Grid, Typography } from '@mui/material'
import { useNotificationsFilter } from 'app/pages/notifications/hooks/useNotificationsFilter'
import { RoleSidebarMapping } from 'types/app'
import { BigCheckbox } from 'app/components/BigCheckbox'
import { formatCamelCasedWithSpaces } from 'helpers/strings'
import { SidebarTitle } from 'ui/Sidebar/SidebarTitle'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { useAuth } from 'hooks/auth/useAuth'

export const NotificationsFilter = () => {
  const { filter, handleClick } = useNotificationsFilter()
  const { user } = useAuth()
  let roles = {}
  user?.roles.split(',').forEach(role => {
    roles = { ...RoleSidebarMapping[role], ...roles }
  })
  return (
    <>
      <SidebarTitle>
        <Typography variant='h6'>FILTERS</Typography>
      </SidebarTitle>

      <SidebarSection padded>
        {Object.entries(roles).map(([key, value]) => (
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
