import React from 'react'
import { MenuItem, Select } from '@mui/material'

const employmentStatusList = [
  'Full-Time Employee',
  'Part-Time Employee',
  'Own Business',
  'Government Employee',
  'Freelancers',
  'Consultants',
  'Self-Employed'
]

export const EmploymentStatusSelect = (props: any) => {
  const { ...rest } = props

  return (
    <Select {...rest} style={{ minWidth: 100 }}>
      {employmentStatusList.map(item => {
        return (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        )
      })}
    </Select>
  )
}
