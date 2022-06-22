import { SelectProps } from '@mui/material'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface DSOSelectProps extends Partial<SelectProps> {
  options: DigitalSecurityOffering[]
}

export const DSOSelect = (props: DSOSelectProps): JSX.Element => {
  const { options, ...rest } = props
  const renderName = (value: any) => {
    return renderValue({
      value: value.split(':')?.[0],
      list: options,
      extractor: ({ tokenName }: DigitalSecurityOffering) => tokenName
    })
  }
  return (
    <Select
      {...rest}
      fullWidth={false}
      renderValue={renderName}
      label={undefined}
    >
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
