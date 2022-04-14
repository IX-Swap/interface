import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const DistributionFrequencySelect = (props: any) => {
  return (
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Distribution Frequency
      </SelectItem>
      <SelectItem value='Not Applicable'>Not Applicable</SelectItem>
      <SelectItem value='Monthly'>Monthly</SelectItem>
      <SelectItem value='Quarterly'>Quarterly</SelectItem>
      <SelectItem value='Semi-Annually'>Semi-Annually</SelectItem>
      <SelectItem value='Annually'>Annually</SelectItem>
    </Select>
  )
}
