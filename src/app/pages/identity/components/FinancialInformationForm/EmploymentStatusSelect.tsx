import React from 'react'
import { MenuItem, Select } from '@material-ui/core'

const employmentStatusList = [
  'Full-Time Employee',
  'Part-Time Employee',
  'Business',
  'Government Employee',
  'Freelancers',
  'Consultants'
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
