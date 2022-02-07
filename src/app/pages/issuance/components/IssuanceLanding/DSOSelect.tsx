import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOSelectProps extends Partial<SelectProps> {
  options: DigitalSecurityOffering[]
}

export const DSOSelect = (props: DSOSelectProps): JSX.Element => {
  const { options, ...rest } = props

  return (
    <Select variant='outlined' fullWidth {...rest}>
      {options.length < 1 && <MenuItem disabled>No Deals Found</MenuItem>}
      {options.map(({ _id, tokenName, user }) => (
        <MenuItem key={_id} value={[_id, user].join(':')}>
          {tokenName}
        </MenuItem>
      ))}
    </Select>
  )
}
