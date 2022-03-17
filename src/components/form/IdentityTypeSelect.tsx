import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'

interface IdentityTypeSelectProps extends Partial<SelectProps> {
  withAll?: boolean
}

export const IdentityTypeSelect = ({
  withAll = false,
  ...other
}: IdentityTypeSelectProps) => {
  return (
    <Select {...other}>
      <MenuItem disabled value={undefined}>
        Identity types
      </MenuItem>
      {withAll && <MenuItem value=''>All</MenuItem>}
      <MenuItem value='individual'>Individual Identity</MenuItem>
      <MenuItem value='issuer'>Issuer Identity</MenuItem>
      <MenuItem value='corporate'>Corporate Identity</MenuItem>
      <MenuItem value='issuer_corporate'>Issuer and Corporate</MenuItem>
    </Select>
  )
}
