import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { Search as SearchIcon } from '@mui/icons-material'

interface GroupedSearchFilterProps {
  isCommitment?: boolean
}

export const GroupedSearchFilter = ({
  isCommitment = false
}: GroupedSearchFilterProps) => {
  const name = isCommitment ? 'searchTokenName' : 'search'
  return (
    <SearchQueryFilter groupFilter name={name}>
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
