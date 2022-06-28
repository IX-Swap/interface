import React from 'react'
import { SelectProps } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { COUNTRIES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

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
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        displayEmpty
        placeholder='Select Country'
      >
        <SelectItem disabled value={undefined}>
          Country
        </SelectItem>
        {renderSelectItems(filteredCountries())}
      </Select>
    </>
  )
}
CountrySelect.displayName = 'Select_CountrySelect'
