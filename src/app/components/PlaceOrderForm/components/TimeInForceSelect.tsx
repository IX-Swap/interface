import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { timeInForceList } from 'app/components/PlaceOrderForm/consts'

export interface TimeInForceSelectProps extends TypedSelectProps {
  includeAll?: boolean
}

export const TimeInForceSelect = (props: TimeInForceSelectProps) => {
  const { includeAll = false, label, ...rest } = props

  return (
    <Select {...(rest as SelectProps)} label={label}>
      {includeAll && <MenuItem value='All'>All</MenuItem>}
      {renderMenuItems(
        timeInForceList.map(option => ({ label: option, value: option }))
      )}
    </Select>
  )
}
