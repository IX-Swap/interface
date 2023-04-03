import { SelectProps } from '@mui/material'
import { tenantThemes } from 'config/defaults'
import { renderSelectItems } from 'helpers/rendering'
import React from 'react'
import { TypedSelectProps } from 'types/util'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'

export interface TenantThemeSelectProps extends TypedSelectProps {
  labelBetweenAll?: string
  showLabel?: boolean
}

export const TenantThemeSelect = (props: TenantThemeSelectProps) => {
  const { showLabel = true, label, labelBetweenAll, ...rest } = props

  return (
    <>
      {showLabel && <InputLabel>{label}</InputLabel>}

      <Select {...(rest as SelectProps)} label={undefined} displayEmpty>
        {renderSelectItems(
          tenantThemes.map(option => ({
            label: option.charAt(0).toUpperCase() + option.slice(1),
            value: option
          }))
        )}
      </Select>
    </>
  )
}
TenantThemeSelect.displayName = 'Select_TenantThemeSelect'
