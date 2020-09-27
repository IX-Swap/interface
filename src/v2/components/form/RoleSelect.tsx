import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectProps
} from '@material-ui/core'
import React from 'react'

const ROLES = ['user', 'accredited', 'authorizer', 'admin', 'issuer']

export interface RoleSelectProps extends SelectProps {
  value: string[]
}

export const RoleSelect = (props: RoleSelectProps) => {
  // TODO: Need to fix TypeScript error for BackdropProps
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
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
  )
}
