import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const BusinessOwnerSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Business owners
      </SelectItem>
      <SelectItem value='1'>1</SelectItem>
      <SelectItem value='2'>2</SelectItem>
      <SelectItem value='3 OR MORE'>3 or more</SelectItem>
      <SelectItem value='UNKNOWN'>Unknown</SelectItem>
    </Select>
  )
}
