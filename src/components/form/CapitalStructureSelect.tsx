import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { useDSOCapitalStructures } from 'hooks/useDSOCapitalStructures'
import { TypedSelectProps } from 'types/util'
import { capitalStructures } from 'config/defaults'

export interface CapitalStructureSelectProps extends TypedSelectProps {
  includeAll?: boolean
}

export const CapitalStructureSelect = (props: CapitalStructureSelectProps) => {
  const { includeAll = false, label, ...rest } = props
  const { data, isLoading } = useDSOCapitalStructures()

  if (isLoading || data === undefined) {
    return null
  }

  const options = data.length > 0 ? data : capitalStructures

  return (
    <Select {...(rest as SelectProps)} label={label}>
      {includeAll && <MenuItem value='All'>All</MenuItem>}
      {renderMenuItems(
        options.map(option => ({ label: option, value: option }))
      )}
    </Select>
  )
}
