import { Checkbox, FormControlLabel } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export interface CurrencyFilterProps {
  currency: 'SGD' | 'USD'
}

export const CurrencyFilter = ({ currency }: CurrencyFilterProps) => {
  const getStringValue = (value: string | undefined) => {
    const valueArray = value?.split(',')

    if (value?.includes(currency) ?? false) {
      return valueArray?.filter(item => item !== currency).join(',') ?? ''
    }

    return [...(valueArray ?? []), currency]
      .filter(item => item !== '')
      .join(',')
  }

  const getChecked = (value: string | undefined) => {
    if (value === undefined) {
      return false
    }
    return value.includes(currency)
  }
  return (
    <SearchQueryFilter<'currency'> name='currency' defaultValue='SGD,USD'>
      {({ value, onChange }) => (
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <Checkbox
              checked={getChecked(value)}
              onChange={() => {
                onChange(getStringValue(value))
              }}
              name='currency'
              color='primary'
            />
          }
          label={currency}
        />
      )}
    </SearchQueryFilter>
  )
}
