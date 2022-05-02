import React from 'react'
import { SelectProps } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { TypedSelectProps } from 'types/util'
import { capitalStructures } from 'config/defaults'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export interface CapitalStructureSelectProps extends TypedSelectProps {
  includeAll?: boolean
  labelBetweenAll?: string
}

export const CapitalStructureSelect = (props: CapitalStructureSelectProps) => {
  const { includeAll = false, label, labelBetweenAll, ...rest } = props

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        {...(rest as SelectProps)}
        label={undefined}
        placeholder={String(label)}
        displayEmpty
      >
        {includeAll && (
          <SelectItem value='All'>
            {labelBetweenAll !== undefined ? labelBetweenAll : 'All'}
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
