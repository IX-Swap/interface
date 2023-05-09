import React from 'react'
import { ROLES } from 'config/roles'
import { Grid, FormControlLabel, Button, Typography } from '@mui/material'
import { useRoleManagement } from 'app/pages/admin/hooks/useRoleManagement'
import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'

export interface RoleManagementProps {
  activeRoles: string[]
}

export const RoleManagement = ({ activeRoles }: RoleManagementProps) => {
  const { selectedRoles, handleChange, handleUpdate } =
    useRoleManagement(activeRoles)

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Typography variant='body1'>Select the roles to update</Typography>
      </Grid>
      <Grid item>
        <Grid container direction='column'>
          {ROLES.map(name => (
            <Grid item key={name}>
              <FormControlLabel
                control={
                  <UICheckbox
                    checked={selectedRoles.includes(name)}
                    onChange={handleChange}
                    name={name}
                    disabled={name === 'user'}
                    data-testid={name}
                  />
                }
                label={name}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Button
          onClick={handleUpdate}
          color='primary'
          variant='contained'
          disableElevation
          disabled={isEqual(sortBy(activeRoles), sortBy(selectedRoles))}
        >
          UPDATE
        </Button>
      </Grid>
    </Grid>
  )
}