import React, { useState, useMemo } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Select, SelectProps } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface Option {
  label: string
  value: string | number
}

export interface AutocompleteProps extends SelectProps {
  options: Option[]
}

export const Autocomplete = ({ options, ...props }: AutocompleteProps) => {
  const containsText = (text: any, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const [selectedOption, setSelectedOption] = useState('')
  const [searchText, setSearchText] = useState('')

  const displayedOptions = useMemo(
    () =>
      options.filter((option: Option) =>
        containsText(option.label, searchText)
      ),
    [searchText, options]
  )

  return (
    <Select
      {...props}
      label={undefined}
      displayEmpty
      placeholder={props.placeholder}
      value={selectedOption}
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
        sx={{ marginTop: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => {
          if (e.key !== 'Escape') {
            e.stopPropagation()
          }
        }}
      />

      {displayedOptions?.map((option: Option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}
