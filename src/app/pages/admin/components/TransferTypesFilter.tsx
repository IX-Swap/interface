import { Checkbox, FormControlLabel } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export interface TransferTypesFilterProps {
  type: 'PP' | 'Fast' | 'ACH'
  defaultValue?: string | null
}

export const TransferTypesFilter = ({
  type,
  defaultValue = 'PP,Fast,ACH'
}: TransferTypesFilterProps) => {
  const getStringValue = (value: string | undefined) => {
    const valueArray = value?.split(',')

    if (value?.includes(type) ?? false) {
      return valueArray?.filter(item => item !== type).join(',') ?? ''
    }

    return [...(valueArray ?? []), type].filter(item => item !== '').join(',')
  }

  const getChecked = (value: string | undefined) => {
    if (value === undefined) {
      return false
    }
    return value.includes(type)
  }

  return (
    <SearchQueryFilter<'transferType'>
      name='transferType'
      defaultValue={defaultValue ?? undefined}
    >
      {({ value, onChange }) => (
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <Checkbox
              checked={getChecked(value)}
              onChange={() => {
                onChange(getStringValue(value))
              }}
              name='transferType'
              color='primary'
            />
          }
          label={type}
        />
      )}
    </SearchQueryFilter>
  )
}
