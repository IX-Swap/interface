import React from 'react'
import { MenuItem, Select } from '@mui/material'

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
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        )
      })}
    </Select>
  )
}
