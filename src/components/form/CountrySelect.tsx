import React from 'react'
import { SelectProps } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { COUNTRIES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface CountrySelectProps extends SelectProps {
  filter?: string[]
}

export const CountrySelect = (props: CountrySelectProps): JSX.Element => {
  const filteredCountries = () => {
    const filter = props.filter
    if (filter === undefined || filter.length < 1) {
      return COUNTRIES_OPTS
    }
    return COUNTRIES_OPTS.filter(country => !filter.includes(country.value))
  }

  return (
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Country
      </SelectItem>
      {renderSelectItems(filteredCountries())}
    </Select>
  )
}
