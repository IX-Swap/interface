import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

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
            <MenuItem value='Equity'>Equity</MenuItem>
            <MenuItem value='Debt'>Debt</MenuItem>
            <MenuItem value='Investment Fund'>Investment Fund</MenuItem>
            <MenuItem value='Revenue Sharing'>Revenue Sharing</MenuItem>
            <MenuItem value='Convertible Security'>
              Convertible Security
            </MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
