import React from 'react'
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material'
import { ROLES } from 'config/roles'

export interface RoleSelectProps extends SelectProps {
  value: string[]
}

export const RoleSelect = (props: RoleSelectProps) => {
  // TODO: Need to fix TypeScript error for BackdropProps
  const getName = (name: string) => {
    if (name === 'fundmanager') {
      return 'fund manager'
    }
    return name
  }

  return (
    <Select
      {...props}
      multiple
      MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } as any }}
      renderValue={selected => (selected as string[]).join(', ')}
    >
      {ROLES.map(name => (
        <MenuItem key={name} value={name}>
          <Checkbox checked={props.value.includes(name)} />
          <ListItemText primary={getName(name)} />
        </MenuItem>
      ))}
    </Select>
  )
}
