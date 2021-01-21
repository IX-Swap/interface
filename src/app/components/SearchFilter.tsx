import React from 'react'
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import debounce from 'lodash/debounce'

interface SearchFilterProps extends OutlinedInputProps {
  inputAdormentPosition?: 'start' | 'end'
}

export const SearchFilter = (props: SearchFilterProps) => {
  const { inputAdormentPosition = 'start', ...rest } = props
  return (
    <SearchQueryFilter<'search'> name='search'>
      {({ value, onChange, onClear }) => (
        <OutlinedInput
          {...rest}
          margin='dense'
          defaultValue={value}
          startAdornment={
            inputAdormentPosition === 'start' ? (
              <InputAdornment position={inputAdormentPosition}>
                <Search color='disabled' />
              </InputAdornment>
            ) : null
          }
          endAdornment={
            inputAdormentPosition === 'end' ? (
              <InputAdornment position={inputAdormentPosition}>
                <Search color='disabled' />
              </InputAdornment>
            ) : null
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
