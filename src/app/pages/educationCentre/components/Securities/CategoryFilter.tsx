import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

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
            <MenuItem value='Industry'>Industry</MenuItem>
            <MenuItem value='Country'>Country</MenuItem>
            <MenuItem value='Securities'>Securities</MenuItem>
            <MenuItem value='Protocol'>Protocol</MenuItem>
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
