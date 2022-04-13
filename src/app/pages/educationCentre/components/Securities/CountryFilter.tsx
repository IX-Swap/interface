import { FormControl, MenuItem } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
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
          <TextFieldSelect
            label='Country'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <MenuItem value=''>All Countries</MenuItem>
            {countries.map(country => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
