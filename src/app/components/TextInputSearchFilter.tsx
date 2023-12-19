import { Search } from '@mui/icons-material'
import { InputAdornment, Theme } from '@mui/material'
import { SxProps } from '@mui/system'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { QueryFilter } from 'hooks/filters/useQueryFilter'
import debounce from 'lodash/debounce'
import React, { CSSProperties } from 'react'
import { InputProps, TextInput } from 'ui/TextInput/TextInput'

export type TextInputSearchFilterProps = InputProps & {
  loading?: boolean
  hideIcon?: boolean
  inputAdornmentPosition?: 'start' | 'end'
  filterValue?: QueryFilter
  onInputCb?: (value: string) => void
  inputStyle?: CSSProperties
  inputSX?: SxProps<Theme>
}
export const TextInputSearchFilter = (props: TextInputSearchFilterProps) => {
  const {
    inputAdornmentPosition = 'start',
    filterValue = 'search',
    onInputCb,
    inputStyle,
    inputSX,
    variant,
    ...rest
  } = props

  return (
    <SearchQueryFilter name={filterValue}>
      {({ value, onChange, onClear }) => (
        <TextInput
          style={inputStyle}
          {...rest}
          variant={variant}
          margin='dense'
          defaultValue={value}
          sx={{
            height: 49,
            ...inputSX
          }}
          InputProps={{
            startAdornment:
              inputAdornmentPosition === 'start' ? (
                <InputAdornment position={inputAdornmentPosition}>
                  <Search color='disabled' />
                </InputAdornment>
              ) : null,
            endAdornment:
              inputAdornmentPosition === 'end' ? (
                <InputAdornment position={inputAdornmentPosition}>
                  <Search color='disabled' />
                </InputAdornment>
              ) : null
          }}
          onChange={event => {
            event.persist()
            debounce(() => {
              const value = event.target.value.trim()

              if (value !== '') {
                onChange(value)
                // onInputCb?.(value)
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
