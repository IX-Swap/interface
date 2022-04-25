import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
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
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...rest}
        style={{ minWidth: 100 }}
        label={undefined}
        displayEmpty
      >
        {IncomeList.map(item => {
          return (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          )
        })}
      </Select>
    </>
  )
}
