import { FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const CategoryFilter = () => {
  return (
    <SearchQueryFilter<'category'> name='category' defaultValue='Industry'>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel shrink>Filter By</InputLabel>
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: SelectChangeEvent<unknown>) => {
              onChange(event.target.value as string)
            }}
            label='Filter By'
          >
            <SelectItem value='Industry'>Industry</SelectItem>
            <SelectItem value='Country'>Country</SelectItem>
            <SelectItem value='Securities'>Securities</SelectItem>
            <SelectItem value='Protocol'>Protocol</SelectItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
