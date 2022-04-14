import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

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
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        )
      })}
    </Select>
  )
}
