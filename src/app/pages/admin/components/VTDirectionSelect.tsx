import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { transferDirections } from 'config/defaults'

export interface VTDirectionSelectProps extends TypedSelectProps {
  includeAll?: boolean
  labelBetweenAll?: string
  valueBetweenAll?: string
}

const getValueForVTDirectionSelect = (value: string) => {
  const firstDigit = value.slice(0, 1)
  const restDigits = value.slice(1, value.length).toLowerCase()
  return firstDigit.concat(restDigits)
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
        <MenuItem value={valueBetweenAll}>
          {labelBetweenAll !== undefined ? labelBetweenAll : 'All'}
        </MenuItem>
      )}
      {renderMenuItems(
        transferDirections.map(option => ({
          label: option,
          value: getValueForVTDirectionSelect(option)
        }))
      )}
    </Select>
  )
}
