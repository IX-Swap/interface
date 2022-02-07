import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { COUNTRIES_OPTS } from 'app/pages/identity/const'

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
      <MenuItem disabled value={undefined}>
        Country
      </MenuItem>
      {renderMenuItems(filteredCountries())}
    </Select>
  )
}
