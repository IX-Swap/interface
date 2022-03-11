import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { capitalStructures } from 'config/defaults'

export interface CapitalStructureSelectProps extends TypedSelectProps {
  includeAll?: boolean
  labelBetweenAll?: string
}

export const CapitalStructureSelect = (props: CapitalStructureSelectProps) => {
  const { includeAll = false, label, labelBetweenAll, ...rest } = props

  return (
    <Select {...(rest as SelectProps)} label={label}>
      {includeAll && (
        <MenuItem value='All'>
          {labelBetweenAll !== undefined ? labelBetweenAll : 'All'}
        </MenuItem>
      )}
      {renderMenuItems(
        capitalStructures.map(option => ({ label: option, value: option }))
      )}
    </Select>
  )
}
