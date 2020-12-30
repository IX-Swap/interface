import React from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { Search as SearchIcon } from '@material-ui/icons'

export const GroupedSearchFilter = () => {
  return (
    <SearchQueryFilter groupFilter name='search'>
      {({ value, onChange }) => (
        <TextField
          fullWidth
          label='Search'
          variant='outlined'
          value={value ?? ''}
          onChange={event => onChange(event.target.value)}
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon color='disabled' />
              </InputAdornment>
            )
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
