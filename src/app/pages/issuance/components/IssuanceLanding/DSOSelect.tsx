import React from 'react'
import { MenuItem, SelectProps, TextFieldProps } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { TextFieldSelect } from 'components/form/TextFieldSelect'

export interface DSOSelectProps extends Partial<SelectProps> {
  options: DigitalSecurityOffering[]
}

export const DSOSelect = (props: DSOSelectProps): JSX.Element => {
  const { options, ...rest } = props

  return (
    <TextFieldSelect variant='outlined' fullWidth {...(rest as TextFieldProps)}>
      {options.length < 1 && <MenuItem disabled>No Deals Found</MenuItem>}
      {options.map(({ _id, tokenName, user }) => (
        <MenuItem key={_id} value={[_id, user].join(':')}>
          {tokenName}
        </MenuItem>
      ))}
    </TextFieldSelect>
  )
}
