import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const CountryFilter = () => {
  return (
    <SearchQueryFilter<'country'> name='country' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel shrink>Country</InputLabel>
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              onChange(event.target.value as string)
            }}
            label='Country'
          >
            <MenuItem value=''>All Countries</MenuItem>
            <MenuItem value='United States'>United States</MenuItem>
            <MenuItem value='Germany'>Germany</MenuItem>
            <MenuItem value='Liechtenstein'>Liechtenstein</MenuItem>
            <MenuItem value='Belarus'>Belarus</MenuItem>
            <MenuItem value='Bahamas'>Bahamas</MenuItem>
            <MenuItem value='Seychelles'>Seychelles</MenuItem>
            <MenuItem value='United Kingdom'>United Kingdom</MenuItem>
            <MenuItem value='Netherlands'>Netherlands</MenuItem>
            <MenuItem value='Switzerland'>Switzerland</MenuItem>
            <MenuItem value='Brazil'>Brazil</MenuItem>
            <MenuItem value='Croatia'>Croatia</MenuItem>
            <MenuItem value='Puerto Rico'>Puerto Rico</MenuItem>
            <MenuItem value='Thailand'>Thailand</MenuItem>
            <MenuItem value='Canada'>Canada</MenuItem>
            <MenuItem value='Singapore'>Singapore</MenuItem>
            <MenuItem value='Cayman Islands'>Cayman Islands</MenuItem>
            <MenuItem value='Gibraltar'>Gibraltar</MenuItem>
            <MenuItem value='France'>France</MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
