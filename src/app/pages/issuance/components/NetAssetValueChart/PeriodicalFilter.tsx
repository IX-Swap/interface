import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { FormControl, MenuItem, Select } from '@material-ui/core'

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
              <MenuItem value='Daily'>Daily</MenuItem>
              <MenuItem value='Weekly'>Weekly</MenuItem>
              <MenuItem value='Monthly'>Monthly</MenuItem>
              <MenuItem value='Quarterly'>Quarterly</MenuItem>
              <MenuItem value='Yearly'>Yearly</MenuItem>
            </Select>
          </FormControl>
        )
      }}
    </SearchQueryFilter>
  )
}
