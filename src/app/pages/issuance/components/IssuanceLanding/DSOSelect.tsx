import { SelectProps } from '@mui/material'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface DSOSelectProps extends Partial<SelectProps> {
  options: DigitalSecurityOffering[]
}

export const DSOSelect = (props: DSOSelectProps): JSX.Element => {
  const { options, ...rest } = props

  return (
    <Select {...rest} fullWidth={false}>
      {options.length < 1 && <SelectItem disabled>No Deals Found</SelectItem>}
      {options.map(({ _id, tokenName, user }) => (
        <SelectItem key={_id} value={[_id, user].join(':')}>
          {tokenName}
        </SelectItem>
      ))}
    </Select>
  )
}

DSOSelect.displayName = 'Select_DSOSelect'
