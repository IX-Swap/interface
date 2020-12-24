import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOSelectProps extends Partial<SelectProps> {
  options: DigitalSecurityOffering[]
}

export const DSOSelect = (props: DSOSelectProps): JSX.Element => {
  const { options, ...rest } = props

  return (
    <Select variant='outlined' fullWidth {...rest}>
      {options.map(({ _id, tokenName }) => (
        <MenuItem key={_id} value={_id}>
          {tokenName}
        </MenuItem>
      ))}
    </Select>
  )
}
