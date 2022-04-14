import React from 'react'
import { SelectProps, TextFieldProps } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface DSOSelectProps extends Partial<SelectProps> {
  options: DigitalSecurityOffering[]
}

export const DSOSelect = (props: DSOSelectProps): JSX.Element => {
  const { options, ...rest } = props

  return (
    <TextFieldSelect variant='outlined' fullWidth {...(rest as TextFieldProps)}>
      {options.length < 1 && <SelectItem disabled>No Deals Found</SelectItem>}
      {options.map(({ _id, tokenName, user }) => (
        <SelectItem key={_id} value={[_id, user].join(':')}>
          {tokenName}
        </SelectItem>
      ))}
    </TextFieldSelect>
  )
}
