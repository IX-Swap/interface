import React from 'react'
import { ListItemText, SelectProps } from '@mui/material'
import { CORPORATE_USER, INDIVISUAL_USER } from 'config/roles'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface RoleSelectProps extends SelectProps {
  value: string[]
  roles: string[]
  investorIdentity: any
  verificationStatus: boolean
}

export const RoleSelect = (props: RoleSelectProps) => {
  // TODO: Need to fix TypeScript error for BackdropProps
  const getName = (name: string) => {
    if (name === 'fundmanager') {
      return 'fund manager'
    }
    if (name === 'tenantOwner') {
      return 'Client'
    }
    if (name === 'none') {
      return 'None'
    }
    if (name === 'admin') {
      return 'Admin'
    }
    if (name === 'issuer') {
      return 'Issuer'
    }
    if (name === 'authorizer') {
      return 'Authorizer'
    }
    return name
  }
  return (
    <>
      {props?.investorIdentity === 'INDIVIDUAL' ? (
        <Select
          disabled={!props?.verificationStatus}
          {...props}
          multiple
          MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } as any }}
          renderValue={selected => (selected as string[]).join(', ')}
        >
          {INDIVISUAL_USER.map(name => (
            <SelectItem
              key={name}
              value={name}
              disabled={name === 'user'}
              sx={{ padding: '5px !important' }}
            >
              <UICheckbox checked={props.value.includes(name)} />
              <ListItemText primary={getName(name)} />
            </SelectItem>
          ))}
        </Select>
      ) : (
        <Select
          disabled={!props?.verificationStatus}
          {...props}
          multiple
          MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } as any }}
          renderValue={selected => (selected as string[]).join(', ')}
        >
          {CORPORATE_USER.map(name => (
            <SelectItem
              key={name}
              value={name}
              disabled={name === 'user'}
              sx={{ padding: '5px !important' }}
            >
              <UICheckbox checked={props.value.includes(name)} />
              <ListItemText primary={getName(name)} />
            </SelectItem>
          ))}
        </Select>
      )}
    </>
  )
}
RoleSelect.displayName = 'Select_RoleSelect'
