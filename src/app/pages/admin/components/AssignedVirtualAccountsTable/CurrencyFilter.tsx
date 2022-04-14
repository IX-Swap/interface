import { FormControlLabel } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'

export interface CurrencyFilterProps {
  currency: 'SGD' | 'USD'
  defaultValue?: string | null
}

export const CurrencyFilter = ({
  currency,
  defaultValue = 'SGD,USD'
}: CurrencyFilterProps) => {
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
    <SearchQueryFilter<'currency'>
      name='currency'
      defaultValue={defaultValue !== null ? defaultValue : undefined}
    >
      {({ value, onChange }) => (
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <UICheckbox
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
