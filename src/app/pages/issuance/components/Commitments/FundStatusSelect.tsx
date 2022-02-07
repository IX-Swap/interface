import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { fundStatuses } from 'config/defaults'

export interface FundStatusSelectSelectProps extends TypedSelectProps {
  includeAll?: boolean
  labelBetweenAll?: string
  valueBetweenAll?: string
}

const getValueForFundStatus = (value: string) => {
  const firstDigit = value.slice(0, 1)
  const restDigits = value.slice(1, value.length).toLowerCase()
  return firstDigit.concat(restDigits)
}

export const FundStatusSelect = (props: FundStatusSelectSelectProps) => {
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
        fundStatuses.map(option => ({
          label: option,
          value: getValueForFundStatus(option)
        }))
      )}
    </Select>
  )
}
