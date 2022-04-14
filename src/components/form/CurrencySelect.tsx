import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

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
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Currency
      </SelectItem>
      {renderSelectItems(CURRENCIES)}
    </Select>
  )
}
