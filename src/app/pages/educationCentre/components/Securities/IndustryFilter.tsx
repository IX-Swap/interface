import { FormControl, MenuItem } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

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
          <TextFieldSelect
            label='Industry'
            onChange={event => {
              onChange(event.target?.value)
            }}
            value={value}
          >
            <MenuItem value=''>All Industries</MenuItem>
            {industries.map(industry => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
