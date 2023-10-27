import React, { ReactNode, useState, useMemo } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Select, SelectProps } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface Option {
  label: string | string[]
  value: string | number
  render?: ReactNode
}

export interface AutocompleteProps extends SelectProps {
  options: Option[]
}

export const Autocomplete = ({ options, ...props }: AutocompleteProps) => {
  const containsText = (text: any, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const [selectedOption, setSelectedOption] = useState(props.value)
  const [searchText, setSearchText] = useState('')

  options = options.map(option => ({
    ...option,
    label: Array.isArray(option.label) ? option.label.join(' ') : option.label
  }))

  const displayedOptions = useMemo(
    () =>
      options.filter((option: Option) =>
        containsText(option.label, searchText)
      ),
    [searchText, options]
  )

  //   useEffect(() => setSelectedOption(props.value), [props.value])

  return (
    <Select
      {...props}
      label={undefined}
      displayEmpty
      placeholder={props.placeholder}
      //   value={selectedOption}
      onChange={(e, value) => {
        setSelectedOption(value?.props?.children)
        if (typeof props.onChange === 'function') props.onChange(e)
      }}
      onClose={() => setSearchText('')}
      renderValue={() => selectedOption}
    >
      <TextField
        size='small'
        autoFocus
        placeholder='Search'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{ marginTop: 1 }}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => {
          if (e.key !== 'Escape') {
            e.stopPropagation()
          }
        }}
      />

      {displayedOptions.length > 0 ? (
        displayedOptions?.map((option: Option, i) => (
          <SelectItem key={i} value={option.value}>
            {option?.render ?? option.label}
          </SelectItem>
        ))
      ) : (
        <SelectItem key={0} value={undefined} disabled>
          No results found.
        </SelectItem>
      )}
    </Select>
  )
}
