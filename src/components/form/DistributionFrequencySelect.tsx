import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const DistributionFrequencySelect = (props: any) => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>

      <Select
        {...props}
        label={undefined}
        placeholder={'Frequency of return distribution'}
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          Frequency of return distribution
        </SelectItem>
        <SelectItem value='Not Applicable'>Not Applicable</SelectItem>
        <SelectItem value='Monthly'>Monthly</SelectItem>
        <SelectItem value='Quarterly'>Quarterly</SelectItem>
        <SelectItem value='Semi-Annually'>Semi-Annually</SelectItem>
        <SelectItem value='Annually'>Annually</SelectItem>
      </Select>
    </>
  )
}
DistributionFrequencySelect.displayName = 'Select_DistributionFrequencySelect'
