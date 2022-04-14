import { FormControl } from '@mui/material'
import { TextFieldSelect } from 'components/form/TextFieldSelect'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
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
          <TextFieldSelect
            label='Industry'
            onChange={event => {
              onChange(event.target?.value)
            }}
            value={value}
          >
            <SelectItem value=''>All Industries</SelectItem>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </TextFieldSelect>
        </FormControl>
      )}
    </SearchQueryFilter>
  )
}
