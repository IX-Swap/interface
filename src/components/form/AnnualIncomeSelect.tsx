import React from 'react'
import { MenuItem, Select } from '@material-ui/core'

const IncomeList = ['10,000,000 and above']

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
