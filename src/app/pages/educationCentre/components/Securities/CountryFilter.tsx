import { FormControl } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
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
          <TextFieldSelect
            label='Country'
            onChange={event => {
              onChange(event.target.value)
            }}
            value={value}
          >
            <SelectItem value=''>All Countries</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
