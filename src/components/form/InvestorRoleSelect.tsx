import React from 'react'
import { ListItemText, SelectProps } from '@mui/material'
import { CORPORATE_INVESTOR, INDIVISUAL_INVESTOR } from 'config/roles'
// import { UICheckbox } from 'components/UICheckbox/UICheckbox'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface RoleSelectProps extends SelectProps {
  value: string[]
  roles: string[]
  investorIdentity: any
  verificationStatus: boolean
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
      return 'Institutional'
    }
    return name
  }

  return (
    <>
      {props?.investorIdentity === 'INDIVIDUAL' ? (
        <Select
          disabled={!props?.verificationStatus}
          {...props}
          // multiple
          MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } as any }}
          renderValue={selected => {
            // console.log(selected)
            return selected as string[]
          }}
        >
          {INDIVISUAL_INVESTOR.map(name => (
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
      ) : (
        <Select
          disabled={!props?.verificationStatus}
          {...props}
          // multiple
          MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } as any }}
          renderValue={selected => selected as string[]}
        >
          {CORPORATE_INVESTOR.map(name => (
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
      )}
    </>
  )
}
InvestorRoleSelect.displayName = 'Select_RoleSelect'
