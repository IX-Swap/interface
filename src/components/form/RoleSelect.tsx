import React from 'react'
import { ListItemText, SelectProps } from '@mui/material'
import { ROLES } from 'config/roles'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

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
        <SelectItem key={name} value={name} disabled={name === 'user'}>
          <UICheckbox checked={props.value.includes(name)} />
          <ListItemText primary={getName(name)} />
        </SelectItem>
      ))}
    </Select>
  )
}
