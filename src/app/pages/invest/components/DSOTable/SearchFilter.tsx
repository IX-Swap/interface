import React from 'react'
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import debounce from 'lodash/debounce'

interface SearchFilterProps extends OutlinedInputProps {}

export const SearchFilter = (props: SearchFilterProps) => {
  return (
    <SearchQueryFilter<'search'> name='search'>
      {({ value, onChange, onClear }) => (
        <OutlinedInput
          {...props}
          margin='dense'
          defaultValue={value}
          startAdornment={
            <InputAdornment position='start'>
              <Search color='disabled' />
            </InputAdornment>
          }
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
        />
      )}
    </SearchQueryFilter>
  )
}
