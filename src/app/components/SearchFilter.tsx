import React, { CSSProperties } from 'react'
import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  Theme
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import debounce from 'lodash/debounce'
import { QueryFilter } from 'hooks/filters/useQueryFilter'
import { SxProps } from '@mui/system'

interface SearchFilterProps extends OutlinedInputProps {
  inputAdornmentPosition?: 'start' | 'end'
  filterValue?: QueryFilter
  onInputCb?: (value: string) => void
  inputStyle?: CSSProperties
  inputSX?: SxProps<Theme>
}

export const SearchFilter = (props: SearchFilterProps) => {
  const {
    inputAdornmentPosition = 'start',
    filterValue = 'search',
    onInputCb,
    inputStyle,
    inputSX,
    ...rest
  } = props

  return (
    <SearchQueryFilter name={filterValue}>
      {({ value, onChange, onClear }) => (
        <OutlinedInput
          style={inputStyle}
          {...rest}
          margin='dense'
          defaultValue={value}
          sx={{
            height: 49,
            ...inputSX
          }}
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
