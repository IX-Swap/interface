import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'

export interface CustodianFilterProps {
  custodian: 'HEX' | 'InvestaX'
  defaultValue?: string | null
}

export const CustodianFilter = ({
  custodian,
  defaultValue = ''
}: CustodianFilterProps) => {
  const getStringValue = (value: string | undefined) => {
    const valueArray = value?.split(',')

    if (value?.includes(custodian) ?? false) {
      return valueArray?.filter(item => item !== custodian).join(',') ?? ''
    }

    return [...(valueArray ?? []), custodian]
      .filter(item => item !== '')
      .join(',')
  }

  const getChecked = (value: string | undefined) => {
    if (value === undefined) {
      return false
    }
    return value.includes(custodian)
  }
  return (
    <SearchQueryFilter<'type'>
      name='type'
      defaultValue={defaultValue !== null ? defaultValue : undefined}
    >
      {({ value, onChange }) => (
        <FormControlLabel
          style={{ marginRight: 0 }}
          control={
            <Checkbox
              checked={getChecked(value)}
              onChange={() => {
                onChange(getStringValue(value))
              }}
              name='type'
              color='primary'
            />
          }
          label={custodian}
        />
      )}
    </SearchQueryFilter>
  )
}
