import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { orderTypesList } from 'app/components/PlaceOrderForm/consts'

export interface OrderTypeSelectProps extends TypedSelectProps {
  includeAll?: boolean
}

export const OrderTypeSelect = (props: OrderTypeSelectProps) => {
  const { includeAll = false, label, ...rest } = props

  return (
    <Select {...(rest as SelectProps)} label={label}>
      {includeAll && <MenuItem value='All'>All</MenuItem>}
      {renderMenuItems(
        orderTypesList.map(option => ({ label: option, value: option }))
      )}
    </Select>
  )
}
