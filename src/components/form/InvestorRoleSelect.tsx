import React from 'react'
import { ListItemText, SelectProps } from '@mui/material'
import { INVESTORROLES } from 'config/roles'
// import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface RoleSelectProps extends SelectProps {
  value: string[]
  roles: string[]
}

export const InvestorRoleSelect = (props: RoleSelectProps) => {
  // TODO: Need to fix TypeScript error for BackdropProps
  const getName = (name: string) => {
    if (name === 'retail') {
      return 'Retail'
    }
    if (name === 'accredited') {
      return 'Accredited'
    }
    if (name === 'expert') {
      return 'Expert'
    }
    if (name === 'institutional') {
      return 'Enstitutional'
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
      {INVESTORROLES.map(name => (
        <SelectItem
          key={name}
          value={name}
          disabled={name === 'user'}
          sx={{ padding: '5px !important' }}
        >
          <UIRadio checked={props.value.includes(name)} />
          <ListItemText primary={getName(name)} />
        </SelectItem>
      ))}
    </Select>
  )
}
InvestorRoleSelect.displayName = 'Select_RoleSelect'
