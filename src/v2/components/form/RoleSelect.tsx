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
  return (
    <Select
      {...props}
      multiple
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
