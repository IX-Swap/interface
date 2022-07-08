import { FormControl } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { isEmptyString } from 'helpers/strings'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const industries = [
  'Diverse Industries',
  'Real Estate',
  'Technology',
  'Finance',
  'Energy & Mining'
]

export const IndustryFilter = () => {
  return (
    <SearchQueryFilter<'industry'> name='industry' defaultValue=''>
      {({ value, onChange }) => (
        <FormControl variant='outlined' style={{ width: 140 }}>
          <InputLabel>Industry</InputLabel>
          <Select
            onChange={event => {
              onChange(event.target?.value as string)
            }}
            value={isEmptyString(value) ? 'All Industries' : value}
          >
            <SelectItem value=''>All Industries</SelectItem>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </Select>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
