import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

const CURRENCIES = [
  {
    label: 'SGD',
    value: 'SGD'
  },
  {
    label: 'USD',
    value: 'USD'
  }
]

export const CurrencySelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder={String(props.label)}
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          Currency
        </SelectItem>
        {renderSelectItems(CURRENCIES)}
      </Select>
    </>
  )
}
