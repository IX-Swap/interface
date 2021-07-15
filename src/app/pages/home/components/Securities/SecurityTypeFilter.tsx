import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const SecurityTypeFilter = () => {
  return (
    <SearchQueryFilter<'securityType'> name='securityType' defaultValue=''>
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
            <MenuItem value='equity'>Equity</MenuItem>
            <MenuItem value='debt'>Debt</MenuItem>
            <MenuItem value='investment-fund'>Investment Fund</MenuItem>
            <MenuItem value='revenue-sharing'>Revenue Sharing</MenuItem>
            <MenuItem value='convertible-security'>
              Convertible Security
            </MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
