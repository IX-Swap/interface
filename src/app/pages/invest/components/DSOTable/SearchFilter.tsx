import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import debounce from 'lodash/debounce'
import React, { ChangeEvent } from 'react'

interface SearchFilterProps extends OutlinedInputProps {}

export const SearchFilter = (props: SearchFilterProps) => {
  const { updateFilter, removeFilter, getFilterValue } = useQueryFilter()
  const defaultValue = getFilterValue('search')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()

    debounce(() => {
      const value = event.target.value.trim()

      if (value !== '') {
        updateFilter('search', value)
      } else {
        removeFilter('search')
      }
    }, 750)()
  }

  return (
    <OutlinedInput
      {...props}
      defaultValue={defaultValue}
      onChange={handleSearchChange}
      margin='dense'
      startAdornment={
        <InputAdornment position='start'>
          <Search color='disabled' />
        </InputAdornment>
      }
    />
  )
}
