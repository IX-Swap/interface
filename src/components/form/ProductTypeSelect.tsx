import { SelectProps } from '@mui/material'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface ProductTypeSelectProps {
  placeHolder?: string | undefined
}

export const productTypes = [
  {
    label: 'Approved Product',
    value: 'approvedProduct'
  },
  {
    label: 'Exempt Product',
    value: 'exemptProduct'
  }
]

export const ProductTypeSelect = (
  props: ProductTypeSelectProps & SelectProps
): JSX.Element => {
  const { label, ...rest } = props

  const renderValue = (selected: any) => {
    const selecteObj = productTypes.find(v => v.value === selected)

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
          Product Type
        </SelectItem>
        {productTypes.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
ProductTypeSelect.displayName = 'Select_ProductTypeSelect'
