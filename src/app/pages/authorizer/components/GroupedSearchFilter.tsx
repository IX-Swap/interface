import { Search as SearchIcon } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'
import debounce from 'lodash/debounce'
interface GroupedSearchFilterProps {
  isCommitment?: boolean
}

export const GroupedSearchFilter = ({
  isCommitment = false
}: GroupedSearchFilterProps) => {
  const name = isCommitment ? 'searchTokenName' : 'search'
  return (
    <SearchQueryFilter
      // groupFilter
      name={name}
    >
      {({ value, onChange, onClear }) => (
        <TextInput
          fullWidth
          placeholder='Search'
          variant='outlined'
          defaultValue={value}
          //   value={value ?? ''}
          //   onChange={event => onChange(event.target.value)}
          onChange={event => {
            event.persist()
            debounce(() => {
              const value = event.target.value.trim()

              if (value !== '') {
                onChange(value)
              } else {
                onClear()
              }
            }, 750)()
          }}
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
