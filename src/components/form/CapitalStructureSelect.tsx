import { SelectProps } from '@mui/material'
import { capitalStructures } from 'config/defaults'
import { renderSelectItems } from 'helpers/rendering'
import React from 'react'
import { TypedSelectProps } from 'types/util'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface CapitalStructureSelectProps extends TypedSelectProps {
  includeAll?: boolean
  labelBetweenAll?: string
  showLabel?: boolean
}

export const CapitalStructureSelect = (props: CapitalStructureSelectProps) => {
  const {
    includeAll = false,
    showLabel = true,
    label,
    labelBetweenAll,
    ...rest
  } = props

  return (
    <>
      {showLabel && <InputLabel>{label}</InputLabel>}
      <Select {...(rest as SelectProps)} label={undefined} displayEmpty>
        {includeAll && (
          <SelectItem value='All'>
            {labelBetweenAll !== undefined ? labelBetweenAll : 'All'}
          </SelectItem>
        )}
        {!includeAll && (
          <SelectItem disabled value={undefined}>
            Select capital structure
          </SelectItem>
        )}
        {renderSelectItems(
          capitalStructures.map(option => ({ label: option, value: option }))
        )}
      </Select>
    </>
  )
}
CapitalStructureSelect.displayName = 'Select_CapitalStructureSelect'
