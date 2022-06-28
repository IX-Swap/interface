import { Search as SearchIcon } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'
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
        <TextInput
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
