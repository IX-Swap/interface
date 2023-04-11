import { SelectProps } from '@mui/material'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface STOClassificationSelectProps {
  placeHolder?: string | undefined
}

export const stoClassifications = [
  {
    label: 'Accredited Investor (AI)',
    value: 'AI'
  },
  {
    label: 'Expert Investor (EI)',
    value: 'EI'
  },
  {
    label: 'Retail Investor (RI)',
    value: 'RI'
  }
]

export const STOClassificationSelect = (
  props: STOClassificationSelectProps & SelectProps
): JSX.Element => {
  const { label, ...rest } = props

  const renderValue = (selected: any) => {
    const selecteObj = stoClassifications.find(v => v.value === selected)

    return typeof selecteObj !== 'undefined' ? selecteObj?.label : selected
  }

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...rest}
        style={{ minWidth: 80 }}
        placeholder={String(props.placeHolder)}
        displayEmpty
        label={undefined}
        renderValue={renderValue}
      >
        <SelectItem disabled value={undefined}>
          Classification
        </SelectItem>
        {stoClassifications.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
STOClassificationSelect.displayName = 'Select_STOClassificationSelect'
