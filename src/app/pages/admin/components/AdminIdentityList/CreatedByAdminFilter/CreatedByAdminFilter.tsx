import { Checkbox, FormControlLabel } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const CreatedByAdminFilter = () => {
  return (
    <SearchQueryFilter<'createdByAdmin'>
      name='createdByAdmin'
      defaultValue='false'
    >
      {({ value, onChange }) => (
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <Checkbox
              checked={value === 'true'}
              onChange={() => {
                onChange(value === 'true' ? 'false' : 'true')
              }}
              name='createdByAdmin'
              color='primary'
            />
          }
          label='Created by admin'
        />
      )}
    </SearchQueryFilter>
  )
}
