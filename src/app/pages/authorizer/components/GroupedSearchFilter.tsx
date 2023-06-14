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
          placeholder='Search'
          variant='outlined'
          value={value ?? ''}
          onChange={event => onChange(event.target.value)}
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='disabled' />
              </InputAdornment>
            )
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
