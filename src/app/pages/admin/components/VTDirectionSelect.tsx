import React from 'react'
import { SelectProps } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { transferDirections } from 'config/defaults'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface VTDirectionSelectProps extends TypedSelectProps {
  includeAll?: boolean
  labelBetweenAll?: string
  valueBetweenAll?: string
}

export const VTDirectionSelect = (props: VTDirectionSelectProps) => {
  const {
    includeAll = false,
    label,
    labelBetweenAll,
    valueBetweenAll = 'All',
    ...rest
  } = props

  return (
    <Select {...(rest as SelectProps)} label={label}>
      {includeAll && (
        <SelectItem value={valueBetweenAll}>
          {labelBetweenAll !== undefined ? labelBetweenAll : 'All'}
        </SelectItem>
      )}
      {renderSelectItems(
        transferDirections.map(option => ({
          label: option,
          value: option
        }))
      )}
    </Select>
  )
}
VTDirectionSelect.displayName = 'Select_VTDirectionSelect'
