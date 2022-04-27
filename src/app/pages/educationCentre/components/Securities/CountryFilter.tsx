import { FormControl } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { isEmptyString } from 'helpers/strings'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

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
          <InputLabel>Country</InputLabel>
          <Select
            onChange={event => {
              onChange(event.target.value as string)
            }}
            value={isEmptyString(value) ? 'All Countries' : value}
          >
            <SelectItem value=''>All Countries</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
