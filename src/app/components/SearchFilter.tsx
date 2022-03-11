import React from 'react'
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import debounce from 'lodash/debounce'
import { QueryFilter } from 'hooks/filters/useQueryFilter'

interface SearchFilterProps extends OutlinedInputProps {
  inputAdornmentPosition?: 'start' | 'end'
  filterValue?: QueryFilter
  onInputCb?: (value: string) => void
}

export const SearchFilter = (props: SearchFilterProps) => {
  const {
    inputAdornmentPosition = 'start',
    filterValue = 'search',
    onInputCb,
    ...rest
  } = props

  return (
    <SearchQueryFilter name={filterValue}>
      {({ value, onChange, onClear }) => (
        <OutlinedInput
          {...rest}
          margin='dense'
          defaultValue={value}
          startAdornment={
            inputAdornmentPosition === 'start' ? (
              <InputAdornment position={inputAdornmentPosition}>
                <Search color='disabled' />
              </InputAdornment>
            ) : null
          }
          endAdornment={
            inputAdornmentPosition === 'end' ? (
              <InputAdornment position={inputAdornmentPosition}>
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
                onInputCb?.(value)
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
