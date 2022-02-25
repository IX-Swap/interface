import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
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
          <TextFieldSelect
            label='Security Type'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <MenuItem value=''>All Types</MenuItem>
            {assetClasses.map(assetClass => (
              <MenuItem key={assetClass} value={assetClass}>
                {assetClass}
              </MenuItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
