import React from 'react'
import { SelectProps } from '@mui/material'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

interface IdentityTypeSelectProps extends Partial<SelectProps> {
  withAll?: boolean
}

export const IdentityTypeSelect = ({
  withAll = false,
  ...other
}: IdentityTypeSelectProps) => {
  return (
    <Select {...other}>
      <SelectItem disabled value={undefined}>
        Identity types
      </SelectItem>
      {withAll && <SelectItem value=''>All</SelectItem>}
      <SelectItem value='individual'>Individual Identity</SelectItem>
      <SelectItem value='issuer'>Issuer Identity</SelectItem>
      <SelectItem value='corporate'>Corporate Identity</SelectItem>
      <SelectItem value='issuer_corporate'>Issuer and Corporate</SelectItem>
    </Select>
  )
}
