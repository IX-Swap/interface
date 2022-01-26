import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const assetClasses = [
  'Equity',
  'Debt',
  'Investment Fund',
  'Revenue Sharing',
  'Convertible Security'
]

export const SecurityTypeFilter = () => {
  return (
    <SearchQueryFilter<'assetClass'> name='assetClass' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel shrink>Security Type</InputLabel>
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              onChange(event.target.value as string)
            }}
            label='Security Type'
          >
            <MenuItem value=''>All Types</MenuItem>
            {assetClasses.map(assetClass => (
              <MenuItem key={assetClass} value={assetClass}>
                {assetClass}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
