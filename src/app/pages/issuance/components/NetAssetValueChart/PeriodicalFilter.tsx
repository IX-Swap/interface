import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { FormControl } from '@mui/material'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const PeriodicalFilter = () => {
  return (
    <SearchQueryFilter name='periodical' defaultValue='Quarterly'>
      {({ value, onChange }) => {
        const handleChange = (event: any) => {
          onChange(event.target.value)
        }

        return (
          <FormControl variant='outlined' fullWidth style={{ width: 300 }}>
            <Select
              labelId='periodical-label'
              value={value}
              onChange={handleChange}
              defaultValue='Quarterly'
            >
              <SelectItem value='Daily'>Daily</SelectItem>
              <SelectItem value='Weekly'>Weekly</SelectItem>
              <SelectItem value='Monthly'>Monthly</SelectItem>
              <SelectItem value='Quarterly'>Quarterly</SelectItem>
              <SelectItem value='Yearly'>Yearly</SelectItem>
            </Select>
          </FormControl>
        )
      }}
    </SearchQueryFilter>
  )
}
