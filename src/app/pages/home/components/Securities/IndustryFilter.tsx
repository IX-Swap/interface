import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const IndustryFilter = () => {
  return (
    <SearchQueryFilter<'industry'> name='industry' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel shrink>Industry</InputLabel>
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              onChange(event.target.value as string)
            }}
            label='Industry'
          >
            <MenuItem value=''>All Industries</MenuItem>
            <MenuItem value='Diverse Industries'>Diverse Industries</MenuItem>
            <MenuItem value='Real Estate'>Real Estate</MenuItem>
            <MenuItem value='Technology'>Technology</MenuItem>
            <MenuItem value='Finance'>Finance</MenuItem>
            <MenuItem value='Energy & Mining'>Energy &amp; Mining</MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
