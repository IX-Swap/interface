import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

const IncomeList = [
  '< 50,000',
  '50,000-100,000',
  '100,000-300,000',
  '>  300,000'
]

export const AnnualIncomeSelect = (props: any) => {
  const { label, ...rest } = props
  return (
    <Select {...rest} style={{ minWidth: 100 }} label={label}>
      {IncomeList.map(item => {
        return (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        )
      })}
    </Select>
  )
}
