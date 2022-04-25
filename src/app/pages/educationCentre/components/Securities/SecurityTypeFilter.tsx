import { FormControl } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { isEmptyString } from 'helpers/strings'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

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
          <InputLabel>Security Type</InputLabel>
          <Select
            onChange={event => {
              onChange(event.target.value as string)
            }}
            value={isEmptyString(value) ? 'All Types' : value}
          >
            <SelectItem value=''>All Types</SelectItem>
            {assetClasses.map(assetClass => (
              <SelectItem key={assetClass} value={assetClass}>
                {assetClass}
              </SelectItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
