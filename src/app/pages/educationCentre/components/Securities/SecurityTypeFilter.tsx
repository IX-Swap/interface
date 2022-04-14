import { FormControl } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
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
          <TextFieldSelect
            label='Security Type'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <SelectItem value=''>All Types</SelectItem>
            {assetClasses.map(assetClass => (
              <SelectItem key={assetClass} value={assetClass}>
                {assetClass}
              </SelectItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
