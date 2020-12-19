import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { useDSOCapitalStructures } from 'hooks/useDSOCapitalStructures'
import { TypedSelectProps } from 'types/util'

export interface CapitalStructureSelectProps extends TypedSelectProps {
  includeAll?: boolean
}

export const CapitalStructureSelect = (props: CapitalStructureSelectProps) => {
  const { includeAll = false, ...rest } = props
  const { data, isLoading } = useDSOCapitalStructures()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Select {...(rest as SelectProps)}>
      {includeAll && <MenuItem value='All'>All</MenuItem>}
      {renderMenuItems(data.map(option => ({ label: option, value: option })))}
    </Select>
  )
}
