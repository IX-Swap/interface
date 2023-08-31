import { FormControl, Grid, Typography } from '@mui/material'
import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import User from 'types/user'
export interface UserRolesProps {
  user: User
}

export const UserRolesSelect = ({ user }: UserRolesProps) => {
  return (
    <Grid sx={{ display: 'flex' }} gap={2}>
      <Grid item>
        <FormControl>
          {/* <InputLabel sx={{ fontWeight: 'bold' }}>User Roles</InputLabel> */}
          <Select defaultValue={user}>
            {user?.split(',').map((role: string) => {
              return (
                <SelectItem>
                  <Typography>{role}</Typography>
                </SelectItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

UserRolesSelect.displayName = 'Select_UserIdentitySelect'
