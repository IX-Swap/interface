import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const countries = [
  'United States',
  'Germany',
  'Liechtenstein',
  'Bahamas',
  'Seychelles',
  'United Kingdom',
  'Belarus',
  'Netherlands',
  'Switzerland',
  'Brazil',
  'Croatia',
  'Puerto Rico',
  'Thailand',
  'Canada',
  'Singapore',
  'Cayman Islands',
  'Gibraltar',
  'France'
]
export const CountryFilter = () => {
  return (
    <SearchQueryFilter<'country'> name='country' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel shrink>Country</InputLabel>
          <Select
            displayEmpty
            value={value ?? ''}
            onChange={(event: SelectChangeEvent<unknown>) => {
              onChange(event.target.value as string)
            }}
            label='Country'
          >
            <MenuItem value=''>All Countries</MenuItem>
            {countries.map(country => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
